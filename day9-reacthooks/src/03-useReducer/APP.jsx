import React, { memo, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {counter: state.counter + action.num, name: state.name}
    case 'decrement':
      return {counter: state.counter - action.num, name: state.name}
    default:
      return state
  }
}

export default memo(function APP() {

  //原本定义数据和修改数据
  // const [counter, setCounter] = useState(0)
  // const [name, setName] = useState('codecao')
  // const [age, setAge] = useState(18)
  // const increment = () => {
  //   setCounter(counter + 1)
  // }
  // const decrement = () => {
  //   setCounter(counter - 1)
  // }

  const [counter, dispatch] = useReducer(reducer, {counter: 0, name: 'codecao', age: 18})
  const code = 'cao'
  return (
    <div>
      <h2>code: {code}</h2>
      <h2>counter: {counter.counter}</h2>
      <h2>name: {counter.name}</h2>
      <h2>age: {counter.age}</h2>
      <button onClick={() => dispatch({type: 'increment', num: 1})}>+1</button>
      <button onClick={() => dispatch({type: 'increment', num: 5})}>+5</button>
      <button onClick={() => dispatch({type: 'decrement', num: 1})}>-1</button>
      <button onClick={() => dispatch({type: 'decrement', num: 5})}>-5</button>
    </div>
  )
})
