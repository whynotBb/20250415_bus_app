import { useEffect, useState } from "react";

interface BusStop {
  id: string;
  name: string;
  x: number; // longitude
  y: number; // latitude
}

export const useBusStops = (location: { latitude: number; longitude: number } | null) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchStops = async () => {
      setLoading(true);
      try {
        // 가짜 데이터 (추후 API로 교체)
        const dummyStops: BusStop[] = [
          { id: "1", name: "정류장A", x: location.longitude + 0.001, y: location.latitude + 0.001 },
          { id: "2", name: "정류장B", x: location.longitude - 0.001, y: location.latitude - 0.001 },
        ];

        // 실제 API 호출 시 아래 코드 사용
        // const res = await fetch("...");
        // const data = await res.json();

        setBusStops(dummyStops);
      } catch (error) {
        console.error("정류장 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
  }, [location]);

  return { busStops, loading };
};
