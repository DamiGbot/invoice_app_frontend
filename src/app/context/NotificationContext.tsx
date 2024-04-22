import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState({
		show: false,
		message: "",
		type: "",
	});

	const triggerNotification = useCallback((message, type = "info") => {
		setNotification({ show: true, message, type });
		setTimeout(
			() => setNotification({ show: false, message: "", type: "" }),
			3000
		);
	}, []);

	return (
		<NotificationContext.Provider value={{ triggerNotification }}>
			{children}
			<div
				className={`notification ${notification.type} ${
					notification.show ? "show" : ""
				}`}
			>
				{notification.message}
			</div>
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
