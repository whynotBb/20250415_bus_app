import { useEffect } from "react";
import { Feature } from "ol";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Style, Circle as CircleStyle, Fill } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { View } from "ol";

interface CurrentLocationMarkerProps {
  location: { latitude: number; longitude: number } | undefined;
  view: View | null;
  markerLayer: VectorLayer<VectorSource> | null;
  defaultCoords: [number, number];
}

const CurrentLocationMarker = ({ location, view, markerLayer, defaultCoords }: CurrentLocationMarkerProps) => {
  console.log("CurrentLocationMarker location", location);

  useEffect(() => {
    if (!view || !markerLayer) return;

    const coords = location ? [location.longitude, location.latitude] : defaultCoords;

    // 지도 중심 이동
    view.setCenter(fromLonLat(coords));

    // 위치 마커 생성
    if (location) {
      const point = new Point(fromLonLat(coords));
      const marker = new Feature(point);

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

      const source = markerLayer.getSource();
      source?.clear();
      source?.addFeature(marker);
    }
  }, [location, view, markerLayer]);

  return null; // 렌더링할 UI 없음
};

export default CurrentLocationMarker;
