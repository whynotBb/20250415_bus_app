import { useQuery } from "@tanstack/react-query";
import { getUltraSrtNcst } from "../apis/weatherApi";
import { UltraSrtNcstReq } from "../models/weather";

/**
 * 초단기실황 api 호출
 */
const useGetUltraSrtNcst = (params: UltraSrtNcstReq) => {
	console.log("초단기실황", params);

	const isReady = !!params.base_date && !!params.base_time && params.nx !== undefined && params.ny !== undefined;
	return useQuery({
		queryKey: ["ultra-srt-ncst", params],
		queryFn: () => getUltraSrtNcst(params),
		enabled: isReady, // ✅ 파라미터 준비 여부 확인
	});
};
export default useGetUltraSrtNcst;
