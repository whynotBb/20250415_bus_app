import { useQuery } from "@tanstack/react-query";
import { UltraSrtNcstReq } from "../models/weather";
import { getUltraSrtFcst } from "../apis/weatherApi";

/**
 * 초단기예보 api 호출
 */
const useGetUltraSrtFcst = (params: UltraSrtNcstReq) => {
	const isReady = !!params.base_date && !!params.base_time && params.nx !== undefined && params.ny !== undefined;
	return useQuery({
		queryKey: ["ultra-srt-fcst", params],
		queryFn: () => getUltraSrtFcst(params),
		enabled: isReady, // ✅ 파라미터 준비 여부 확인
	});
};
export default useGetUltraSrtFcst;
