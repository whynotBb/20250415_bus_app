import { useQuery } from "@tanstack/react-query";
import { getOpenWeatherForecast } from "../apis/weatherApi";
import { ILocation } from "../models/map";

/**
 * 단기(5일간)예보 api 호출
 */
const useGetOpenWeatherForecast = (params: ILocation) => {
	return useQuery({
		queryKey: ["open-weather", params],
		queryFn: () => getOpenWeatherForecast(params),
	});
};
export default useGetOpenWeatherForecast;
