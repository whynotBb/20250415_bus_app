import { useEffect, useRef } from "react";
import { Map as OlMap, View } from "ol";
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

const vworld_api_key = import.meta.env.VITE_VWORLD_API_KEY;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const MapContainer = styled("div")({});

const HomeMapPage = () => {
  // 현재위치 가져오기
  const { location, error } = useGeoLocation(geolocationOptions);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<OlMap | null>(null);
  const viewInstance = useRef<View | null>(null);
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  // 기본 위치 좌표
  const defaultCoords: [number, number] = [126.9783785, 37.5666612]; // 서울시청

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

  return (
    <MapContainer ref={mapRef} style={{ width: "100%", height: "100vh" }}>
      <BusStopMarkers location={location} map={mapInstance.current} />

      {/* 현재위치 마커 */}
      <CurrentLocationMarker
        location={location}
        view={viewInstance.current}
        markerLayer={markerLayerRef.current}
        defaultCoords={defaultCoords}
      />
    </MapContainer>
  );
};

export default HomeMapPage;
