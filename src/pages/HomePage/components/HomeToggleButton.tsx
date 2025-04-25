import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { Alignment } from "../../../models/home";
import MapIcon from "@mui/icons-material/Map";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const FloatButtonBx = styled("div")(({ theme }) => ({
	position: "fixed",
	top: "20px",
	left: "20px",
	zIndex: "10",
	background: theme.palette.background.paper,
	"&>div": {
		display: "flex",
		flexDirection: "column",
	},
	button: {
		padding: "7px",
		border: "none",
	},
}));

interface HomeToggleButtonProps {
	alignment: Alignment;
	handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: Alignment | null) => void;
}

const HomeToggleButton = ({ alignment, handleChange }: HomeToggleButtonProps) => {
	return (
		<FloatButtonBx>
			<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
				<ToggleButton value="map" title="지도로 보기">
					<MapIcon />
				</ToggleButton>
				<ToggleButton value="text" title="텍스트로 보기">
					<FormatListBulletedIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</FloatButtonBx>
	);
};

export default HomeToggleButton;
