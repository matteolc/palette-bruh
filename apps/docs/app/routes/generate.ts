import type { LoaderFunctionArgs } from "@vercel/remix";
import { BASE_TOKENS } from "~/components/PaletteToolbar";

export async function action({ request }: LoaderFunctionArgs) {
	const formData = await request.formData();

	const mode =
		(formData.get("mode") as "diffusion" | "transformer" | "random") ||
		"transformer";
	const num_colors = 3; // or 4
	const temperature = Number(formData.get("temperature")) || 1.2;
	const page =
		(formData.get("page") as
			| "website-magazine"
			| "brand-2"
			| "brand-3"
			| "website-1") || "brand-2";
	const palette = Array<string>(3).fill("-");
	const preset = formData.get("preset") || "default";
	const adjacency = (formData.get("adjacency") as string)?.split(",") || [];

	const tokens = BASE_TOKENS.filter((token) => token !== "neutral");
	for (const token of tokens) {
		const value = formData.get(token);
		if (value) {
			palette[tokens.indexOf(token)] = value as string;
		}
	}

	if (preset === "high-contrast" || preset === "bright-light") {
		palette[0] = "#ffffff";
	}

	const cfg = {
		preset,
		mode,
		num_colors,
		temperature,
		num_results: mode !== "diffusion" ? 50 : 5,
		page,
		adjacency, // nxn adjacency matrix as a flat array of strings
		palette,
	};

	console.dir(cfg, { depth: null });

	const data = await fetch("https://api.huemint.com/color", {
		method: "POST",
		body: JSON.stringify(cfg),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const generated = await data.json();
	// console.dir(generated, { depth: null });

	return {
		results: generated.results,
	};
}
