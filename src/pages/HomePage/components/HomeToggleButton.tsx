import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { Alignment } from "../../../models/home";

const FloatButtonBx = styled("div")(({ theme }) => ({
	position: "fixed",
	top: "20px",
	left: "50%",
	transform: "translateX(-50%)",
	zIndex: "10",
	background: theme.palette.background.paper,
}));

interface HomeToggleButtonProps {
	alignment: Alignment;
	handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: Alignment) => void;
}

const HomeToggleButton = ({ alignment, handleChange }: HomeToggleButtonProps) => {
	return (
		<FloatButtonBx>
			<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
				<ToggleButton value="map">지도로 보기</ToggleButton>
				<ToggleButton value="text">그냥 보기</ToggleButton>
			</ToggleButtonGroup>
		</FloatButtonBx>
	);
};

export default HomeToggleButton;
