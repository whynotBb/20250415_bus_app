import { styled, Typography, useTheme } from "@mui/material";
import { HashLoader } from "react-spinners";

const PrepareBx = styled("div")({
	height: "calc(100vh - 56px)",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "40px",
});

const Prepare = () => {
	const theme = useTheme();
	return (
		<PrepareBx>
			<Typography variant="h2">서비스 준비 중</Typography>
			<HashLoader size={40} color={theme.palette.primary.main} loading={true} aria-label="Loading Spinner" data-testid="loader" />
		</PrepareBx>
	);
};

export default Prepare;
