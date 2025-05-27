import { useQuery } from "@tanstack/react-query";
import { getUltraSrtNcst } from "../apis/weatherApi";
import { UltraSrtNcstReq } from "../models/weather";

const useGetUltraSrtNcst = (params: UltraSrtNcstReq) => {
	const isReady = !!params.base_date && !!params.base_time && params.nx !== undefined && params.ny !== undefined;
	return useQuery({
		queryKey: ["ultra-srt-ncst", params],
		queryFn: () => getUltraSrtNcst(params),
		enabled: isReady, // ✅ 파라미터 준비 여부 확인
	});
};
export default useGetUltraSrtNcst;
