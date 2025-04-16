import { useEffect, useRef } from "react";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import { Map as OlMap } from "ol";
import useGetStationsByPosList from "../../../../hooks/useGetStationsByPosList";

interface Props {
  location: { latitude: number; longitude: number } | null;
  map: OlMap | null;
}

const BusStopMarkers = ({ location, map }: Props) => {
  const { busStops } = useGetStationsByPosList(location);
  console.log("busStops data", busStops);

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

    busStops.forEach((stop) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([stop.x, stop.y])),
        name: stop.name,
      });

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "#0077cc" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        })
      );

      source?.addFeature(feature);
    });
  }, [busStops]);

  return null;
};

export default BusStopMarkers;
