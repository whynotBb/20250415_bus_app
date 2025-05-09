import { create } from "zustand";
import { GetStationsByPosResponse, StationByUidItem } from "../models/map";

interface stationData {
	stationData: GetStationsByPosResponse<StationByUidItem> | null;
	setStationData: (newData: GetStationsByPosResponse<StationByUidItem> | null) => void;
}

export const useStationByIdItemStore = create<stationData>((set) => ({
	stationData: null,
	setStationData: (newData) => set({ stationData: newData }),
}));
