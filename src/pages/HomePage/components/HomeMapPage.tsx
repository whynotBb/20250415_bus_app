import { useEffect, useRef } from "react";
import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { defaults as defaultControls } from "ol/control";

const HomeMapPage = () => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tileLayer = new TileLayer({
			source: new OSM({ attributions: "" }),
		});

		const view = new View({
			center: fromLonLat([126.9783785, 37.5666612]), // 서울시청
			zoom: 14,
		});

		const map = new OlMap({
			target: mapRef.current || undefined,
			controls: defaultControls({ zoom: false, rotate: false, attribution: false }),
			layers: [tileLayer],
			view: view,
		});

		return () => {
			map.setTarget(undefined);
		};
	}, []);

	return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default HomeMapPage;
