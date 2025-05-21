import { create } from "zustand";
import { UltraSrtFcstRes, UltraSrtNcstRes } from "../models/weather";

interface WeatherNcst {
	weatherNcstData: UltraSrtNcstRes | null;
	setWeatherNcst: (data: UltraSrtNcstRes) => void;
}
interface WeatherFcst {
	weatherFcstData: UltraSrtFcstRes | null;
	setWeatherFcst: (data: UltraSrtFcstRes) => void;
}
// 초 단기 실황
export const useWeatherNcst = create<WeatherNcst>((set) => ({
	weatherNcstData: null,
	setWeatherNcst: (data) => set({ weatherNcstData: data }),
}));

// 초 단기 예보
export const useWeatherFcst = create<WeatherFcst>((set) => ({
	weatherFcstData: null,
	setWeatherFcst: (data) => set({ weatherFcstData: data }),
}));
