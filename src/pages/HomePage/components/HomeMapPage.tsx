import { useEffect, useRef } from "react";
import { Feature, Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { defaults as defaultControls } from "ol/control";
import { useGeoLocation } from "../../../hooks/useGeoLocation";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import { Style, Circle as CircleStyle, Fill } from "ol/style";

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
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

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
    if (!mapInstance.current || !viewInstance.current) return;

    const coords = location ? [location.longitude, location.latitude] : defaultCoords;

    // 중심 위치 이동
    viewInstance.current.setCenter(fromLonLat(coords));

    // 현재 위치 마커 표시
    if (location) {
      const point = new Point(fromLonLat([location.longitude, location.latitude]));
      const marker = new Feature(point);

      // 스타일 두 개 겹쳐서 적용
      const outerCircle = new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({ color: "rgba(0, 173, 181, 0.3)" }),
        }),
      });

      const innerCircle = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: "rgb(0, 173, 181)" }),
        }),
      });

      marker.setStyle([outerCircle, innerCircle]);

      // 마커 레이어에 기존 마커 제거 후 새 마커 추가
      const source = markerLayerRef.current?.getSource();
      source?.clear(); // 기존 마커 제거
      source?.addFeature(marker);
    }
  }, [location]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default HomeMapPage;
