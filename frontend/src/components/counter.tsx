import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "@/services/slice/counter";

import styled from "styled-components";

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonContanier = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  `;

const Counter: React.FC = () => {
	const dispatch = useDispatch();
	const count = useSelector((state: any) => state.counter.value);

	return (
		<Container>
			<h1>Counter</h1>
			<p role="status">Count: {count}</p>
			<ButtonContanier>
				<button onClick={() => dispatch(decrement())}>Decrement</button>

				<button onClick={() => dispatch(reset())}>Reset</button>

				<button onClick={() => dispatch(increment())}>Increment</button>
			</ButtonContanier>
		</Container>
	);
};

export default Counter;
