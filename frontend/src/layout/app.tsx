import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import styled from "styled-components";

import Header from "@/components/header";
import Footer from "@/components/footer";

interface Props extends PropsWithChildren {
	privatized?: boolean;
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const AppLayout: React.FC<Props> = ({ children, privatized = true }) => {
	
	const navigate = useNavigate();
	const { isError } = api.useRefreshQuery();

	useEffect(() => {
		if (privatized) {
			if (isError) {
				navigate("/");
			}
		}
	}, [isError]);

	return (
		<Container>
			<Header />
			{children}
			<Footer />
		</Container>
	);
};

export default AppLayout;
