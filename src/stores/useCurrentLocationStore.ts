import { create } from "zustand";
import { ILocation } from "../models/map";
interface LocationData {
	currentLocation: ILocation | null;
	setCurrentLocation: (newLocation: ILocation) => void;
}

export const useCurrentLocationStore = create<LocationData>((set) => ({
	currentLocation: null,
	setCurrentLocation: (newLocation) => set({ currentLocation: newLocation }),
}));
