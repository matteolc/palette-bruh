import muiPalette from "./palettes/mui";
import staticPalette from "./palettes/static";
import aiPalette from "./palettes/dynamic";

export type ThemeColorScheme = "light" | "dark";
export type ThemeVariant = "mui" | "static" | "dynamic";

export const createEnum = <T extends readonly string[]>(values: T) => {
  return values.reduce((acc, value) => {
    acc[value as T[number]] = value;
    return acc;
  }, {} as { [key in T[number]]: key });
};

export const ThemeColorSchemeEnum = createEnum(["light", "dark"] as const);
export const ThemeVariantEnum = createEnum(["mui", "static", "dynamic"] as const);

export const ThemeVariantToPalette = {
  mui: muiPalette,
  static: staticPalette,
  dynamic: aiPalette,
};

export type StaticThemePreset = 'split-complementary' | 'tetrad' | 'triad'

export type Theme = {
  "color-scheme": ThemeColorScheme;
  variant: ThemeVariant;
  preset?: StaticThemePreset;
  reverse?: boolean;
  debug?: boolean;
  baseColors: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
};

export type Themes = Record<string, Theme>;
