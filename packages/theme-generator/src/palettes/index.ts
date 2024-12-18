import picocolors from "picocolors";
import { formatSchemistToHex } from "../color/formatting";
import { parseColor } from "../color/parsing";
import nearestColor from "../color/nearest";
import { version } from "../../package.json";
import {
  ThemeVariantToPalette,
  type Theme,
  ThemeColorSchemeEnum,
} from "../types";

export const usePalette = (theme: Theme) => {

  const {
    debug,
    reverse,
    preset,
    baseColors: { primary, secondary, accent },
  } = theme;

  if (debug) {
    console.log(
      "\n",
      `🏄   ${picocolors.magenta("@repo/theme-generator")} ${picocolors.dim(
        version
      )}`
    );
  }

  const [_, primaryColor] = parseColor(primary);
  if (!primaryColor) {
    return {};
  }
  const primaryColorName = nearestColor(formatSchemistToHex(primaryColor));

  if (debug) {
    console.log(
      ` ├─ ${picocolors.green(
        "✔︎"
      )} Generating theme for primary color: ${picocolors.dim(
        primaryColorName
      )} (${picocolors.dim(primary)})`
    );
    console.log(
      `%cPrimary (input)\n${formatSchemistToHex(primaryColor)}`, `color: #000000; background-color: ${formatSchemistToHex(primaryColor)}; padding: 0.5rem;`
    );
  }

  let secondaryColor;

  if (secondary && theme.variant === 'dynamic') {
    const parsed = parseColor(secondary);
    if (parsed[1]) {
      secondaryColor = parsed[1];
      const secondaryColorName = nearestColor(formatSchemistToHex(secondaryColor));
      if (debug) {
        console.log(
          ` ├─ ${picocolors.green(
            "✔︎"
          )} Generating theme for secondary color: ${picocolors.dim(
            secondaryColorName
          )} (${picocolors.dim(secondary)})`
        );
        console.log(
          `%cSecondary (input)\n${formatSchemistToHex(secondaryColor)}`, `color: #000000; background-color: ${formatSchemistToHex(secondaryColor)}; padding: 0.5rem;`
        );
      }
    }
  }

  let accentColor

  if (accent && theme.variant === 'dynamic') {
    const parsed = parseColor(accent);
    if (parsed[1]) {
      accentColor = parsed[1];
      const accentColorName = nearestColor(formatSchemistToHex(accentColor));
      if (debug) {
        console.log(
          ` ├─ ${picocolors.green(
            "✔︎"
          )} Generating theme for accent color: ${picocolors.dim(
            accentColorName
          )} (${picocolors.dim(accent)})`
        );
        console.log(
          `%cAccent (input)\n${formatSchemistToHex(accentColor)}`, `color: #000000; background-color: ${formatSchemistToHex(accentColor)}; padding: 0.5rem;`
        );
      }
    }
  }

  const palette = ThemeVariantToPalette[theme.variant]({
    primaryColor,
    secondaryColor,
    accentColor,
    reverse: reverse ?? false,
    preset: preset ?? "split-complementary",
    isDark: theme["color-scheme"] === ThemeColorSchemeEnum.dark,
  });

  if (debug) {
    Object.entries(palette).forEach(([key, value]) => {
      console.log(
        `%c${picocolors.dim(key)}\n${value.name}`, `color: #000000; background-color: ${value.color}; padding: 0.5rem;`
      );
    });
  }

  return palette;
};
