import { useEffect, useRef } from "react";
import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { defaults as defaultControls } from "ol/control";
import { useGeoLocation } from "../../../hooks/useGeoLocation";

const vworld_api_key = import.meta.env.VITE_VWORLD_API_KEY;

const geolocationOptions = {
	enableHighAccuracy: true,
	timeout: 1000 * 10,
	maximumAge: 1000 * 3600 * 24,
};

const HomeMapPage = () => {
	const { location, error } = useGeoLocation(geolocationOptions);
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<OlMap | null>(null);
	const viewInstance = useRef<View | null>(null);

	const defaultCoords: [number, number] = [126.9783785, 37.5666612]; // 서울시청

	useEffect(() => {
		const tileLayer = new TileLayer({
			source: new XYZ({
				url: `https://api.vworld.kr/req/wmts/1.0.0/${vworld_api_key}/Base/{z}/{y}/{x}.png`,
				attributions: "",
			}),
		});

		const view = new View({
			center: fromLonLat(defaultCoords),
			zoom: 18,
		});

		const map = new OlMap({
			target: mapRef.current || undefined,
			controls: defaultControls({ zoom: false, rotate: false, attribution: false }),
			layers: [tileLayer],
			view: view,
		});

		mapInstance.current = map;
		viewInstance.current = view;

		return () => {
			map.setTarget(undefined);
		};
	}, []);

	useEffect(() => {
		if (!mapInstance.current || !viewInstance.current) return;

		const coords = location ? [location.longitude, location.latitude] : defaultCoords;

		viewInstance.current.setCenter(fromLonLat(coords));
	}, [location]);

	return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default HomeMapPage;
