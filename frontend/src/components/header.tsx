import * as React from "react";
import styled from "styled-components";

import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

interface Props {}

const Container = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  margin-top: 0px;
  align-items: center;
  gap: 10px;
`;


export const Header: React.FC<Props> = () => {
	return (
		<Container>
			<a href="https://vite.dev" target="_blank">
				<img src={viteLogo} className="logo" alt="Vite logo" />
			</a>
			<h1>Vite + React + TS </h1>
			<a href="https://react.dev" target="_blank">
				<img src={reactLogo} className="logo react" alt="React logo" />
			</a>
		</Container>
	);
};

export default Header;
