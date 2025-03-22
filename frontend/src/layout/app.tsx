import React, { PropsWithChildren, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
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

export const AppLayout: React.FC<Props> = ({ privatized = true }) => {
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
			<Outlet />
			<Footer />
		</Container>
	);
};

export default AppLayout;
