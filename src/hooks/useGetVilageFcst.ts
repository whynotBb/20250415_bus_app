import { useQuery } from "@tanstack/react-query";
import { UltraSrtNcstReq } from "../models/weather";
import { getVilageFcst } from "../apis/weatherApi";

/**
 * 단기(5일간)예보 api 호출
 */
const useGetVilageFcst = (params: UltraSrtNcstReq) => {
	const isReady = !!params.base_date && !!params.base_time && params.nx !== undefined && params.ny !== undefined;
	return useQuery({
		queryKey: ["vilage-fcst", params.base_date, params.base_time, params.nx, params.ny],
		queryFn: () => getVilageFcst(params),
		enabled: isReady,
	});
};
export default useGetVilageFcst;
