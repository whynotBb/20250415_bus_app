export const unixToKstConvert = (unixTime: number): string => {
	const date = new Date(unixTime * 1000);
	let hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours === 0 ? 12 : hours; // convert 0 to 12

	const hoursStr = hours.toString().padStart(2, "0");
	const minutesStr = minutes.toString().padStart(2, "0");

	return `${hoursStr}:${minutesStr} ${ampm}`;
};
