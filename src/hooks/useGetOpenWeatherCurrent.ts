import { useQuery } from "@tanstack/react-query";
import { getOpenWeatherCurrent } from "../apis/weatherApi";
import { ILocation } from "../models/map";

/**
 * 단기(5일간)예보 api 호출
 */
const useGetOpenWeatherCurrent = (params: ILocation) => {
	return useQuery({
		queryKey: ["open-weather-current", params],
		queryFn: () => getOpenWeatherCurrent(params),
	});
};
export default useGetOpenWeatherCurrent;
