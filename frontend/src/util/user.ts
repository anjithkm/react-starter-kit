const USER_DATA: string = process.env.USER_DATA || "your_user_data_key"; // Use an environment variable in production

export const setUserData = (data: any) => {
	const stringified = JSON.stringify(data);
	window.localStorage.setItem(USER_DATA, stringified);
};

export const getUserData = () => {
	const user = window.localStorage.getItem(USER_DATA);
	if (user) {
		const data = JSON.parse(user);
		if (data) {
			return data;
		}
	}

	return null;
};

export const clearUserData = () => {
	window.localStorage.removeItem(USER_DATA);
};
