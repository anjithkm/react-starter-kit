import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query/react";

// Define TypeScript interfaces for API responses
interface loginCredentials {
	userName: number;
	password: string;
}

interface loginResponse {
	token: string;
	refresh: string;
	timestamp: string;
}

// Define API End points
export const postApiEndPoints =(builder:EndpointBuilder<BaseQueryFn, string, string>)=>{

    return({
        logout: builder.query<any, void>({
            query: () => "/logout",
        }),
        login: builder.mutation<any, loginCredentials>({
            query: (payload: loginCredentials) => ({
                url: "/login",
                method: "POST",
                body: payload,
            }),
        }),
    })
}

export default postApiEndPoints;