import {
  RiMagicLine,
  RiSunLine,
  RiMoonLine,
  RiHeartLine,
} from "@remixicon/react";
import { useContext, useEffect, useState } from "react";
import { type BaseColors, PaletteContext } from "~/PaletteContext";
import { ThemeVariantEnum } from "@repo/theme-generator/types";
import { Form, useFetcher } from "@remix-run/react";
import type { action } from "~/routes/generate";
import { PaletteToolbarContext } from "../../PaletteToolbarContext";
import { PaletteSettings } from "./PaletteSettings";
import { randomUsableColor } from "node_modules/@repo/theme-generator/src/color/manipulation";
import { formatSchemistToHex } from "node_modules/@repo/theme-generator/src/color/formatting";
import { PaletteSwatches } from "./PaletteSwatches";
import type { action as favouritesAction } from "~/routes/kfavourites";
import { useDownload } from "~/lib/use-download";

const BASE_TOKENS = ["primary", "secondary", "accent", "neutral"];
const STATUS_TOKENS = ["info", "success", "warning", "error"];

const PaletteToolbar = () => {
  const { setIsDark, isDark, setBaseColors, variant, palette } =
    useContext(PaletteContext);
  const { temperature, profile, preset, adjacency, page, numColors } =
    useContext(PaletteToolbarContext);
  const [generatedPalettes, setGeneratedPalettes] = useState<
    { palette: string[] }[] | undefined
  >([]);
  const generateFetcher = useFetcher<typeof action>({ key: "generate" });
  const favouritesFetcher = useFetcher<typeof favouritesAction>({
    key: "favourites",
  });

  const paletteToColors = Object.entries(palette ?? {}).reduce(
    (acc, [key, value]) => {
      acc[key] = { value: value.color, type: "color" };
      return acc;
    },
    {} as Record<string, { value: string; type?: string }>,
  );
  useDownload(
    JSON.stringify({
      colors: {
        type: "color",
        ...paletteToColors,
      },
    }),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (generateFetcher?.data?.results && generatedPalettes?.length === 0)
      setGeneratedPalettes(generateFetcher.data.results);
  }, [generateFetcher.data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const result = generatedPalettes?.[0];
    if (!result) return;

    const palette = result.palette;
    setBaseColors?.({
      primary: palette[0],
      secondary: palette[1],
      accent: palette[2],
    });
  }, [generatedPalettes]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(
    () => setGeneratedPalettes([]),
    [temperature, profile, preset, page],
  );

  const popPalette = () => setGeneratedPalettes(generatedPalettes?.slice(1));

  const resetGeneratedPalettes = () => setGeneratedPalettes([]);

  const handleRandomize = () =>
    setBaseColors?.({
      primary: formatSchemistToHex(randomUsableColor()),
    } as BaseColors);

  const shouldSubmit = generatedPalettes?.length === 0;

  return (
    <div className="fixed bottom-0 left-0 md:mb-4 right-0 flex justify-center z-50">
      <div className="items-center gap-2 rounded-lg px-2 py-1 hidden md:flex bg-white backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-center text-zinc-900">
          <Form
            noValidate
            fetcherKey="generate"
            navigate={false}
            action="/generate"
            method="POST"
          >
            <input
              type="text"
              readOnly
              className="hidden"
              value={profile}
              name="mode"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={preset}
              name="preset"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={numColors}
              name="colors"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={temperature}
              name="temperature"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={adjacency}
              name="adjacency"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={page}
              name="page"
            />

            {variant === ThemeVariantEnum.dynamic ? (
              <button
                className="px-1 py-2"
                type={shouldSubmit ? "submit" : "button"}
                onClick={popPalette}
              >
                <RiMagicLine
                  className={
                    variant !== ThemeVariantEnum.dynamic ? "text-gray-400" : ""
                  }
                />
              </button>
            ) : (
              <button
                className="px-1 py-2"
                type="button"
                onClick={handleRandomize}
              >
                <RiMagicLine />
              </button>
            )}
          </Form>
          <PaletteSettings />
          <Form
            noValidate
            fetcherKey="favourites"
            navigate={false}
            action="/favourites"
            method="POST"
          >
            <input
              type="text"
              readOnly
              className="hidden"
              value={palette?.primary.color}
              name="primary"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={palette?.secondary.color}
              name="secondary"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={palette?.accent.color}
              name="accent"
            />
            <input
              type="text"
              readOnly
              className="hidden"
              value={palette?.neutral.color}
              name="neutral"
            />
            <button type="submit" className="pl-1 pr-2.5 py-2">
              <RiHeartLine />
            </button>
          </Form>

          <PaletteSwatches onLockUnlock={resetGeneratedPalettes} />

          <button
            type="button"
            className="pl-1 pr-2.5 py-2"
            onClick={() => setIsDark?.(!isDark)}
          >
            {isDark ? <RiMoonLine /> : <RiSunLine />}
          </button>
        </div>
      </div>
    </div>
  );
};

export { PaletteToolbar, BASE_TOKENS, STATUS_TOKENS };
