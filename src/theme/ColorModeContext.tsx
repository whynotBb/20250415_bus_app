// ColorModeContext.tsx
import { createContext } from "react";
import { ThemeMode } from "../models/theme";

export interface ColorModeContextType {
	mode: ThemeMode;
	toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
	mode: "dark",
	toggleColorMode: () => {},
});
