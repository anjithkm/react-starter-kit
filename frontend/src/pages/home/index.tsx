// Home.js
import React from "react";
import Layout from "@/layout/app";

import api from "@/services/api";

import "./home.css";

export const Home: React.FC = () => {

	const { data, isLoading, isError, isSuccess } = api.useGetPostsQuery()

	return (
		<Layout>
			<h1>Vite + React + TS </h1>
			<div className="card">
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<p> { isLoading && "loading.." }</p>
				{/* <ul>
					{getPostById.data && (
						<li key={getPostById.data.id}>{getPostById.data.title}</li>
					)}
				</ul> */}
			</div>
		</Layout>
	);
};

export default Home;
