import { createContext, useEffect, useState } from "react";

type GeneratorProfile = "transformer" | "diffusion" | "creative";
type GeneratorPage = "website-magazine" | "brand-2" | "brand-3" | "website-1";
type GeneratorPreset = "default" | "high-contrast" | "bright-light" | "pastel" | "vibrant" | "dark" | "hyper-color";

const AdjancyMap = {
    3: {
        "website-1": {
            default: [
                "0",
                "75",
                "50",
                "75",
                "0",
                "50",
                "50",
                "50",
                0
            ],
            "high-contrast": [
                "0",
                "85",
                "60",
                "85",
                "0",
                "50",
                "60",
                "50",
                0
            ],
            "bright-light": [
                "0",
                "45",
                "30",
                "45",
                "0",
                "0",
                "30",
                "0",
                0
            ],
            pastel: [
                "0",
                "45",
                "30",
                "45",
                "0",
                "30",
                "30",
                "30",
                0
            ],
            vibrant: [
                "0",
                "65",
                "45",
                "65",
                "0",
                "35",
                "45",
                "35",
                0
            ],
            dark: [
                "0",
                "85",
                "70",
                "85",
                "0",
                "55",
                "70",
                "55",
                0
            ],
            "hyper-color": ["0", "65", "55", "65", "0", "45", "55", "45", "0"],
        },
        "brand-2": {
            default: ["0", "75", "55", "75", "0", "0", "55", "0", "0"],
            "high-contrast": ["0", "90", "55", "90", "0", "0", "55", "0", "0"], // requires first color to be locked on white
            "bright-light": ["0", "45", "30", "45", "0", "0", "30", "0", "0"], // requires first color to be locked on white
            pastel: ["0", "45", "30", "45", "0", "0", "30", "0", "0"], // requires palette_multi
            vibrant: ["0", "55", "35", "55", "0", "0", "35", "0", "0"],
            dark: ["0", "100", "75", "100", "0", "0", "75", "0", "0"],
            "hyper-color": ["0", "75", "55", "75", "0", "0", "55", "0", "0"],
        },
        "website-magazine": {
            default: ["0", "75", "50", "75", "0", "50", "50", "50", "0"],
            "high-contrast": ["0", "85", "60", "85", "0", "50", "60", "50", "0"],
            "bright-light": ["0", "45", "30", "45", "0", "0", "30", "0", "0"],
            pastel: ["0", "45", "30", "45", "0", "30", "30", "30", "0"],
            vibrant: ["0", "65", "45", "65", "0", "35", "45", "35", "0"],
            dark: ["0", "85", "70", "85", "0", "55", "70", "55", "0"],
            "hyper-color": ["0", "65", "55", "65", "0", "45", "55", "45", "0"],
        },
        "brand-3": {
            default: ["0", "75", "55", "75", "0", "0", "55", "0", "0"],
            "high-contrast": ["0", "90", "55", "90", "0", "0", "55", "0", "0"], // requires first color to be locked on
            "bright-light": ["0", "45", "30", "45", "0", "0", "30", "0", "0"], // requires first color to be locked on white
            pastel: ["0", "45", "30", "45", "0", "0", "30", "0", "0"], // requires palette_multi
            vibrant: ["0", "55", "35", "55", "0", "0", "35", "0", "0"],
            dark: ["0", "100", "75", "100", "0", "0", "75", "0", "0"],
            "hyper-color": ["0", "75", "55", "75", "0", "0", "55", "0", "0"],
        }
    }
}

type PaletteToolbarContextType = {
    setProfile?: (profile: GeneratorProfile) => void
    setTemperature?: (temperature: number) => void
    setPreset?: (preset: GeneratorPreset) => void
    setPage?: (page: GeneratorPage) => void
    setAdjacency?: (adjacency: string[]) => void
    adjacency: string[]
    profile: GeneratorProfile
    page: GeneratorPage
    temperature: number
    preset: GeneratorPreset
    numColors: 3
}

export const PaletteToolbarContext = createContext<PaletteToolbarContextType>({
    adjacency: AdjancyMap[3]["brand-2"]["default"],
    profile: "transformer",
    page: "brand-2",
    temperature: 1.2,
    preset: "default",
    numColors: 3
});

export const PaletteToolbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<GeneratorProfile>("transformer");
    const [temperature, setTemperature] = useState<number>(1.2);
    const [preset, setPreset] = useState<GeneratorPreset>("default");
    const [page, setPage] = useState<GeneratorPage>("brand-2");
    const [numColors, setNumColors] = useState<3>(3);
    const [adjacency, setAdjacency] = useState<string[]>(AdjancyMap[numColors][page][preset].map(String));

    useEffect(() => {
        setAdjacency(AdjancyMap[numColors][page][preset].map(String));
    }, [page, preset]);

    return (
        <PaletteToolbarContext.Provider value={{ profile, setProfile, page, setPage, temperature, setTemperature, preset, setPreset, adjacency, setAdjacency, numColors }}>
            <div>
                {children}
            </div>
        </PaletteToolbarContext.Provider >
    );
};