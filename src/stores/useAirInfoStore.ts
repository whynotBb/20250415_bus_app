import { create } from "zustand";
import { AirInfoDataResponse } from "../models/airInfo";

interface AirInfoState {
	airInfo: AirInfoDataResponse | null;
	setAirInfo: (data: AirInfoDataResponse) => void;
}

export const useAirInfoStore = create<AirInfoState>((set) => ({
	airInfo: null,
	setAirInfo: (data) => set({ airInfo: data }),
}));
