import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { incrementAction, decrementAction } from './store/modules/counter'

const Home = memo((props) => {
  const {message} = useSelector(state => ({
    message: state.counter.name
  }), shallowEqual)
  console.log('Home组件渲染')
  return (
    <div>
      <h2>Home组件：{message}</h2>
    </div>
  )
})

export default memo(function APP() {
  // 1.使用useSelector将state中的数据映射到当前组件中
  const count = useSelector(state => state.counter.count)
  const name = useSelector(state => state.counter.name, shallowEqual)

  // 2.使用useDispatch直接派发action
  const dispatch = useDispatch()
  function addNumberHandler(num, isAdd = true) {
    if (isAdd) {
      dispatch(incrementAction(num))
    } else {
      dispatch(decrementAction(num))
    }
  }
  console.log("组件渲染")
  return (
    <div>
      <h2>当前计数：{count}</h2>
      <h2>当前姓名：{name}</h2>
      <Home />
      <button onClick={() => addNumberHandler(1)}>+1</button>
      <button onClick={() => addNumberHandler(1, false)}>-1</button>
      <button onClick={() => addNumberHandler(5)}>+5</button>
      <button onClick={() => addNumberHandler(5, false)}>-5</button>
    </div>
  )
})
