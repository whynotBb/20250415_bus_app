import { useQuery } from "@tanstack/react-query";
import { MidFcstReq } from "../models/weather";
import { getMidLandFcst } from "../apis/weatherApi";

/**
 * 중기 육상 예보 api 호출
 * 예보일로부터 4일에서 10일까지 육상날씨정보를 조회
 */
const useGetMidLandFcst = (params: MidFcstReq) => {
	const isReady = !!params.regId && !!params.tmFc;
	return useQuery({
		queryKey: ["vilage-fcst", params],
		queryFn: () => getMidLandFcst(params),
		enabled: isReady,
	});
};
export default useGetMidLandFcst;
