import React, { PropsWithChildren, useEffect } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

interface Props extends PropsWithChildren {}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const AuthLayout: React.FC<Props> = ({ children }) => {
	// { data: refreshData, error: refreshError, isLoading: refreshLoading }
	const navigate = useNavigate();

	const { data: refreshData } = api.useRefreshQuery();

	useEffect(() => {
		if (refreshData && refreshData.success) {
			navigate("/home");
		}
	}, [refreshData]);

	return <Container>{children}</Container>;
};

export default AuthLayout;
