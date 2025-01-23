import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '@/services/slice/counter'

const Counter: React.FC = () => {
	const dispatch = useDispatch()
	const count = useSelector((state: any) => state.counter.value)

	return (
		<div>
			<h1 >Counter</h1>
			<p role="status">Count: {count}</p>
			<div  style={{ display: 'flex', flexDirection: 'row', gap: '10px',justifyContent: 'center'}}>

			<button onClick={() => dispatch(decrement())}>
				Decrement
			</button>

			<button  onClick={() => dispatch(reset())}>
				Reset
			</button>

			<button  onClick={() => dispatch(increment())}>
				Increment
			</button>
			</div>
		</div>
	)
}

export default Counter
