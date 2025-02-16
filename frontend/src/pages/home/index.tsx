// Home.js
import React from "react";
import Layout from "@/layout/app";
import styled from "styled-components";
import Counter from "@/components/counter";

import api from "@/services/api";

import "./home.css";

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Home: React.FC = () => {
	const { isLoading } = api.useGetPostsQuery();

	return (
		<Layout>
			<Container>
				<p>
					Edit <code>src/pages</code> and save.
				</p>
				<Counter />
				<p> {isLoading && "loading.."}</p>
			</Container>
		</Layout>
	);
};

export default Home;
