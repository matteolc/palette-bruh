import muiPalette from "./palettes/mui";
import spotPalette from "./palettes/spot";
import aiPalette from "./palettes/ai";

export type ThemeColorScheme = "light" | "dark";
export type ThemeVariant = "mui" | "spot" | "ai";

export const createEnum = <T extends readonly string[]>(values: T) => {
  return values.reduce((acc, value) => {
    acc[value as T[number]] = value;
    return acc;
  }, {} as { [key in T[number]]: key });
};

export const ThemeColorSchemeEnum = createEnum(["light", "dark"] as const);
export const ThemeVariantEnum = createEnum(["mui", "spot", "ai"] as const);

export const ThemeVariantToPalette = {
  mui: muiPalette,
  spot: spotPalette,
  ai: aiPalette,
};

export type StaticThemePreset = 'split-complementary' | 'tetrad' | 'triad'

export type Theme = {
  "color-scheme": ThemeColorScheme;
  variant: ThemeVariant;
  preset?: StaticThemePreset;
  reverse?: boolean;
  smooth?: boolean; // unused
  lightness?: number;
  saturation: number;
  contrast?: number; // unused
  ratios?: number[]; // unused
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
};

export type Themes = Record<string, Theme>;
