import { useEffect, useRef, useState } from "react";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature, Map as OlMap } from "ol";
import { ILocation } from "../../../../models/map";
import useGetStationsByPos from "../../../../hooks/useGetStationsByPos";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

interface Props {
	location: ILocation;
	map: OlMap | null;
}

const BusStopMarkers = ({ location, map }: Props) => {
	const [radius, setRadius] = useState<number>(1000);
	const { data, error, isLoading } = useGetStationsByPos({ location, radius });
	const stationList = data?.ServiceResult.msgBody.itemList;
	console.log("BusStopMarkers : stationList :", stationList);

	const layerRef = useRef<VectorLayer<VectorSource> | null>(null);

	useEffect(() => {
		if (!map) return;

		const source = new VectorSource();
		const layer = new VectorLayer({ source });
		map.addLayer(layer);

		layerRef.current = layer;

		return () => {
			if (layer) map.removeLayer(layer);
		};
	}, [map]);

	useEffect(() => {
		if (!layerRef.current) return;

		const source = layerRef.current.getSource();
		source?.clear();
		stationList?.forEach((station) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([station.gpsX, station.gpsY])),
				name: stop.name,
			});

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
	}, [stationList]);

	return null;
};

export default BusStopMarkers;
