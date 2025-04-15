// theme.js
import { createTheme } from "@mui/material";
import { ThemeMode } from "../models/theme";

export const getTheme = (mode: ThemeMode) =>
	createTheme({
		palette: {
			mode,
			primary: {
				main: "#00ADB5",
				light: "#AAE3E2",
			},
			success: {
				main: "#AC7DD2",
				light: "#fff4ff",
			},
			secondary: {
				main: mode === "dark" ? "#C5C5C5" : "#000000",
			},
			background: {
				default: mode === "dark" ? "#222831" : "#fffefb",
				paper: mode === "dark" ? "#393E46" : "#f5f4f1",
			},
			text: {
				primary: mode === "dark" ? "#eee" : "#1d1c1c",
				secondary: mode === "dark" ? "#C5C5C5" : "#313d44",
			},
			action: {
				hover: mode === "dark" ? "#282828" : "#eee",
				active: mode === "dark" ? "#C5C5C5" : "#999",
			},
		},
		typography: {
			fontFamily: "Roboto, Arial, sans-serif",
			h1: {
				fontWeight: 700,
				fontSize: "24px",
			},
			h2: {
				fontSize: "1rem",
			},
			body1: {
				fontSize: "14px",
			},
			subtitle1: {
				fontSize: "0.6875rem",
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: "30px",
						textTransform: "none",
						outline: "0",
						"&:hover": { BorderColor: "red" },
						"&:focus": { outline: "0", boxShadow: "none" },
						"&.Mui-focusVisible": {
							outline: "none",
							boxShadow: "none",
						},
					},
					containedSecondary: {
						backgroundColor: mode === "dark" ? "#ffffff" : "#000000",
						color: mode === "dark" ? "#000000" : "#ffffff",
						"&:hover": {
							backgroundColor: mode === "dark" ? "#e0e0e0" : "#222",
						},
					},
					sizeLarge: {
						padding: "8px 32px",
						fontWeight: 700,
						fontSize: "16px",
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						outline: "0",
						background: mode === "dark" ? "#393E46" : "#f5f4f1",
						boxShadow: mode === "dark" ? "none" : "3px 3px 2px 1px rgba(0, 0, 0, .1)",
						"&:hover": {
							background: mode === "dark" ? "#393E46" : "#f5f4f1",
						},
						"&:focus": {
							outline: "0",
						},
						"&:focus-visible": {
							outline: "0",
						},
					},
				},
			},
			MuiButtonBase: {
				styleOverrides: {
					root: {
						outline: "0",
						"&:hover": {
							backgroundColor: mode === "dark" ? "#e0e0e0" : "#222",
							BorderColor: "red",
						},
						"&:focus": {
							outline: "0",
						},
						"&:focus-visible": {
							outline: "0",
						},
					},
				},
			},
		},
	});
