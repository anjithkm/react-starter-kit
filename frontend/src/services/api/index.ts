import {
	createApi,
	fetchBaseQuery,
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

// const fn ={
// 	getPosts: builder.query<Post[], void>({
// 		query: () => '/posts',
// 	}),
// 	getPostById: builder.query<Post, string>({
// 		query: (id:string) => `/posts/${id}`,
// 	}),
// 	createPost: builder.mutation<Post, NewPost>({
// 		query: (newPost:NewPost) => ({
// 			url: '/posts',
// 			method: 'POST',
// 			body: newPost,
// 		}),
// 	}),
// }

// Create the API slice
export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
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
	}),
});

// Export hooks generated by RTK Query
export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } =
	api;
export default api.reducer;
