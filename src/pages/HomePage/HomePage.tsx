import React, { useState } from "react";
import HomeToggleButton from "./components/HomeToggleButton";
import { Alignment } from "../../models/home";
import HomeMapPage from "./components/HomeMapPage";
import HomeTextPage from "./components/HomeTextPage";

const HomePage = () => {
	const [alignment, setAlignment] = useState<Alignment>("map");

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: Alignment) => {
		setAlignment(newAlignment);
	};
	return (
		<div>
			<HomeToggleButton alignment={alignment} handleChange={handleChange} />
			{alignment === "map" ? <HomeMapPage /> : <HomeTextPage />}
		</div>
	);
};

export default HomePage;
