import Prepare from "../../common/components/Prepare";
import { useAirInfoStore } from "../../stores/useAirInfoStore";

const WeatherPage = () => {
	const { airInfo } = useAirInfoStore();
	console.log("WeatherPage - air info", airInfo);

	return (
		<div>
			<Prepare />
		</div>
	);
};

export default WeatherPage;
