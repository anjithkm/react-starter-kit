import {
	EndpointBuilder,
	BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

// Define TypeScript interfaces for API responses
interface Post {
	id: number;
	title: string;
	body: string;
}

interface NewPost {
	title: string;
	body: string;
}

// Define API End points
export const postApiEndPoints =(builder:EndpointBuilder<BaseQueryFn, string, string>)=>{

    return({
        getPosts: builder.query<Post[], void>({
            query: () => "/posts",
        }),
        getPostById: builder.query<Post, string>({
            query: (id: string) => `/posts/${id}`,
        }),
        createPost: builder.mutation<Post, NewPost>({
            query: (newPost: NewPost) => ({
                url: "/posts",
                method: "POST",
                body: newPost,
            }),
        }),
    })
}

export default postApiEndPoints;