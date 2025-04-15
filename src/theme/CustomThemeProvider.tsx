// CustomThemeProvider.tsx
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { ColorModeContext } from "./ColorModeContext";
import { ThemeMode } from "../models/theme";
import { getTheme } from "./theme";

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>("dark");

	const toggleColorMode = () => {
		setMode((prev) => (prev === "light" ? "dark" : "light"));
	};

	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<ColorModeContext.Provider value={{ mode, toggleColorMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default CustomThemeProvider;
