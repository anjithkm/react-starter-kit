// Home.js
import React from "react";
import Layout from "@/layout/app";
import "./home.css";

export const Home: React.FC = () => {
	return (
		<Layout>
			<h1>Vite + React + TS </h1>
			<div className="card">
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</Layout>
	);
};

export default Home;
