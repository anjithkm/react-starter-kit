import * as React from "react";
import styled from "styled-components";

interface Props {}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`;

const Footer: React.FC<Props> = () => {
	return (
		<Container>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</Container>
	);
};

export default Footer;
