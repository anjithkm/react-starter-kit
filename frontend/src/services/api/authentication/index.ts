import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { setUserData, getUserData, clearUserData } from "@/util/user";

// Define TypeScript interfaces for API responses
interface loginCredentials {
	user_name: string;
	password: string;
}

interface signUpCredentials {
	user_name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface refreshPlayload {
	access_token: string;
	refresh_token: string;
}

interface loginResponse {
	token: string;
	refresh: string;
	timestamp: string;
}

export const getRefreshTokenQuery = () => {
	const data = getUserData();
	if (data) {
		return `/auth/refresh?access_token=${data?.access_token}&refresh_token=${data?.refresh_token}`;
	}
	return `/auth/refresh?access_token=null&refresh_token=null`;
};

// Define API End points
export const authApiEndPoints = (
	builder: EndpointBuilder<BaseQueryFn, string, string>,
) => {
	return {
		logout: builder.query<any, void>({
			query: () => "/auth/logout",
			transformResponse: (response: any) => {
				// Add a timestamp to each post
				if (response.success) {
					clearUserData();
				}
				return response;
			},
		}),
		login: builder.mutation<any, loginCredentials>({
			query: (payload: loginCredentials) => ({
				url: "/auth/login",
				method: "POST",
				body: payload,
			}),
			// Use transformResponse to modify the response data before it's stored in Redux
			transformResponse: (response: any) => {
				// Add a timestamp to each post
				if (response.success) {
					setUserData(response.data);
				}
				return response;
			},
		}),
		signUp: builder.mutation<any, signUpCredentials>({
			query: (payload: signUpCredentials) => ({
				url: "/auth/sign-up",
				method: "POST",
				body: payload,
			}),
		}),
		refresh: builder.query<any, void>({
			query: () => getRefreshTokenQuery(),
			// Use transformResponse to modify the response data before it's stored in Redux
			transformResponse: (response: any) => {
				if (response.success) {
					setUserData(response.data);
				}
				return response;
			},
		}),
	};
};

export default authApiEndPoints;
