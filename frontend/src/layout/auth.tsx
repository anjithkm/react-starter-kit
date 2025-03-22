import React, { PropsWithChildren, useEffect } from "react";
import api from "@/services/api";
import { Outlet, useNavigate } from "react-router";

import styled from "styled-components";

interface Props extends PropsWithChildren {}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
`;

export const AuthLayout: React.FC<Props> = ({}) => {
	// { data: refreshData, error: refreshError, isLoading: refreshLoading }
	const navigate = useNavigate();

	const { data: refreshData } = api.useRefreshQuery();

	useEffect(() => {
		if (refreshData && refreshData.success) {
			navigate("/home");
		}
	}, [refreshData]);

	return (
		<Container>
			<Outlet />
		</Container>
	);
};

export default AuthLayout;
