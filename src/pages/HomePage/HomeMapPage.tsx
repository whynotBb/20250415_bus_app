import { useEffect, useRef, useState } from "react";
import { Feature, Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { defaults as defaultControls } from "ol/control";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { styled } from "@mui/material";
import CurrentLocationMarker from "./components/Map/CurrentLocationMarker";
import BusStopMarkers from "./components/Map/BusStopMarkers";
import BusStopDetail from "./components/Map/BusStopDetail";
import { ILocation, StationByUidItem, StationItem } from "../../models/map";
import { Point } from "ol/geom";
import CircleStyle from "ol/style/Circle";
import { Fill, Style } from "ol/style";
import WeatherWidget from "./components/WeatherWidget";
import { useCurrentLocationStore } from "../../stores/useCurrentLocationStore";

const vworld_api_key = import.meta.env.VITE_VWORLD_API_KEY;

const geolocationOptions = {
	enableHighAccuracy: true,
	timeout: 1000 * 10,
	maximumAge: 1000 * 3600 * 24,
};

const MapContainer = styled("div")({});

const HomeMapPage = ({ openBusDetail }: { openBusDetail: (busDetailInfo: StationByUidItem) => void }) => {
	// 기본 위치 좌표
	const defaultCoords: [number, number] = [126.9783785, 37.5666612]; // 서울시청
	// 현재위치 가져오기
	const { location } = useGeoLocation(geolocationOptions);
	// 현재 위치 store 에 저장
	const { setCurrentLocation } = useCurrentLocationStore();
	useEffect(() => {
		if (location) {
			console.log("here!!", location);

			setCurrentLocation(location);
		}
	}, [location]);
	const [mapLocation, setMapLocation] = useState<ILocation>();

	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<OlMap | null>(null);
	const viewInstance = useRef<View | null>(null);
	const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

	//bottom sheet : 버스 정류장 정보 여닫기
	// false : 닫힘 / true:열림
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [stationInfo, setStationInfo] = useState<StationItem | null>(null);

	const bottomSheetHandler = (open: boolean, station?: StationItem) => {
		setIsOpen(open);

		if (station) {
			setStationInfo(station);
			setMapLocation({ latitude: station.gpsY, longitude: station.gpsX });
			console.log("bottomSheetHandler station", station);
		} else {
			setStationInfo(null);
		}
	};

	// v world 지도 그리기
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

		// 마커 레이어 생성 및 추가
		const markerSource = new VectorSource();
		const markerLayer = new VectorLayer({
			source: markerSource,
		});
		map.addLayer(markerLayer);
		markerLayerRef.current = markerLayer;

		mapInstance.current = map;
		viewInstance.current = view;

		return () => {
			map.setTarget(undefined);
		};
	}, []);

	useEffect(() => {
		if (!mapLocation || !viewInstance.current || !markerLayerRef.current) return;

		const coords = [mapLocation.longitude, mapLocation.latitude];

		// 지도 중심 이동
		viewInstance.current.setCenter(fromLonLat(coords));
		viewInstance.current.setZoom(19);

		// 위치 마커 생성
		if (location) {
			const point = new Point(fromLonLat(coords));
			const focusMarker = new Feature(point);
			focusMarker.setId("focus-marker"); // ID 설정

			const outerCircle = new Style({
				image: new CircleStyle({
					radius: 15,
					fill: new Fill({ color: "rgba(181, 0, 112, 0.3)" }),
				}),
			});

			const innerCircle = new Style({
				image: new CircleStyle({
					radius: 5,
					fill: new Fill({ color: "rgb(181, 0, 181)" }),
				}),
			});

			focusMarker.setStyle([outerCircle, innerCircle]);

			const source = markerLayerRef.current.getSource();
			// source?.clear(); // 마커 다지우기

			// 기존 focus-marker 삭제
			const existingFocus = source?.getFeatureById("focus-marker");
			if (existingFocus) {
				source?.removeFeature(existingFocus);
			}

			source?.addFeature(focusMarker);
		}
	}, [mapLocation]);

	return (
		<>
			<MapContainer ref={mapRef} style={{ width: "100%", height: "calc(100vh - 56px" }}>
				{location && <BusStopMarkers location={location} map={mapInstance.current} bottomSheetHandler={bottomSheetHandler} />}

				{/* 현재위치 마커 */}
				<CurrentLocationMarker location={location} view={viewInstance.current} markerLayer={markerLayerRef.current} defaultCoords={defaultCoords} />
			</MapContainer>
			{location && <WeatherWidget location={location} />}
			<BusStopDetail isOpen={isOpen} stationInfo={stationInfo} openBusDetail={openBusDetail} />
			{/* {isBusDetailOpen && <BusDetail />} */}
		</>
	);
};

export default HomeMapPage;
