import { useQuery } from "@tanstack/react-query";
import { getOpenWeather } from "../apis/weatherApi";
import { ILocation } from "../models/map";

/**
 * 단기(5일간)예보 api 호출
 */
const useGetOpenWeather = (params: ILocation) => {
	return useQuery({
		queryKey: ["open-weather", params],
		queryFn: () => getOpenWeather(params),
	});
};
export default useGetOpenWeather;
