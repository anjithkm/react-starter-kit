const USER_DATA_KEY: string = import.meta.env.USER_KEY || "your_user_key"; // Use an environment variable in production

export const setUserData = (data: any) => {
	const stringified = JSON.stringify(data);
	window.localStorage.setItem(USER_DATA_KEY, stringified);
};

export const getUserData = () => {
	const user = window.localStorage.getItem(USER_DATA_KEY);
	if (user) {
		const data = JSON.parse(user);
		if (data) {
			return data;
		}
	}

	return null;
};

export const clearUserData = () => {
	window.localStorage.removeItem(USER_DATA_KEY);
};
