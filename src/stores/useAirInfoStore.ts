import { create } from "zustand";
import { AirInfoDataResponse } from "../models/airInfo";

interface AirInfoState {
	airInfo: AirInfoDataResponse | null;
	setAirInfo: (data: AirInfoDataResponse) => void;
}
interface AirInfoStationAddr {
	airInfoStationAddr: string | null;
	setAirInfoStationAddr: (data: string) => void;
}

export const useAirInfoStore = create<AirInfoState>((set) => ({
	airInfo: null,
	setAirInfo: (data) => set({ airInfo: data }),
}));

export const useAirInfoStationAddrStore = create<AirInfoStationAddr>((set) => ({
	airInfoStationAddr: null,
	setAirInfoStationAddr: (data) => set({ airInfoStationAddr: data }),
}));
