import { useState, useEffect } from "react";
import { ILocation } from "../models/map";

/**
 * 브라우저의 현재 위치 좌표 가져오기
 * @param options
 * @returns
 */
export const useGeoLocation = (options = {}) => {
	const [location, setLocation] = useState<ILocation>();
	const [error, setError] = useState("");

	const handleSuccess = (pos: GeolocationPosition) => {
		const { latitude, longitude } = pos.coords;

		setLocation({
			latitude,
			longitude,
		});
	};

	const handleError = (err: GeolocationPositionError) => {
		setError(err.message);
	};

	useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) {
			setError("Geolocation is not supported.");
			return;
		}

		geolocation.getCurrentPosition(handleSuccess, handleError, options);
	}, [options]);

	return { location, error };
};
