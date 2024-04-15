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

export function formatDateFromArray(dateParts: string[]): string {
	// Define an array of month names to map abbreviated month to full name
	const monthNumbers = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12,
	};

	// Extract the day, month, and year from the date parts array
	const day = dateParts[2]; // Assuming day is always at index 2
	const monthAbbr = dateParts[1]; // Assuming month abbreviation is at index 1
	const year = dateParts[3]; // Assuming year is at index 3

	// Map the month abbreviation to full month name
	const month = monthNumbers[monthAbbr];

	// Format the date string as "DD MMMM YYYY"
	return `${year}-${month}-${day}`;
}

export const validateEmail = (email: string): boolean => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email.toLowerCase());
};
