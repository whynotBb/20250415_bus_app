import { useEffect, useRef, useState } from "react";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature, MapBrowserEvent, Map as OlMap } from "ol";
import { ILocation, StationItem } from "../../../../models/map";
import useGetStationsByPos from "../../../../hooks/useGetStationsByPos";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

interface Props {
	location: ILocation;
	map: OlMap | null;
	bottomSheetHandler: (open: boolean, station?: StationItem) => void;
}

const BusStopMarkers = ({ location, map, bottomSheetHandler }: Props) => {
	const [radius, setRadius] = useState<number>(1000);
	const { data, error, isLoading } = useGetStationsByPos({ location, radius });
	const stationList = data?.ServiceResult.msgBody.itemList;

	const layerRef = useRef<VectorLayer<VectorSource> | null>(null);

	useEffect(() => {
		if (!map) return;

		const source = new VectorSource();
		const layer = new VectorLayer({ source });
		map.addLayer(layer);
		layerRef.current = layer;

		const handleMapClick = (evt: MapBrowserEvent<PointerEvent>) => {
			let foundFeature = false;
			map.forEachFeatureAtPixel(evt.pixel, (feature) => {
				const station = feature.get("station");
				console.log("forEachFeatureAtPixel : station", station);
				if (station) {
					foundFeature = true;
					bottomSheetHandler(true, station);
				}
				return true; // 클릭한 첫 번째 feature만 처리
			});
			if (!foundFeature) {
				console.log("here?!?!");

				bottomSheetHandler(false);
			}
		};

		map.on("singleclick", handleMapClick);

		return () => {
			map.removeLayer(layer);
			map.un("singleclick", handleMapClick);
		};
	}, [map]);

	useEffect(() => {
		if (!layerRef.current || !stationList) return;

		const source = layerRef.current.getSource();
		source?.clear();
		stationList?.forEach((station) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([station.gpsX, station.gpsY])),
				name: station.stationNm,
			});

			// feature 에 station 객체 저장
			feature.set("station", station);

			feature.setStyle(
				new Style({
					image: new Icon({
						anchor: [0.5, 46],
						anchorXUnits: "fraction",
						anchorYUnits: "pixels",
						src: "/src/assets/ico_bus_stop.png",
						scale: 0.2,
					}),
				})
			);

			source?.addFeature(feature);
		});
	}, [stationList, location]);

	return null;
};

export default BusStopMarkers;
