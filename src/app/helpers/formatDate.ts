export function formatDate(inputDate: string): string {
	// Create a Date object from the input string
	const date = new Date(inputDate);

	// Define an array of month names to convert month number to month name
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Extract the day, month, and year from the date object
	// Pad the day with a leading zero if it is less than 10
	const day = date.getDate().toString().padStart(2, "0");
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	// Format the date string as "DD MMM YYYY"
	return `${day} ${monthNames[monthIndex]} ${year}`;
}
