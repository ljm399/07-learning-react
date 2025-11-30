import React, { memo, useState, useCallback, useRef } from 'react'
const HYHome = memo(function HYHome(props) {
  const {increment} = props
  console.log('HYHome render')
  return (
    <div>
      <h2>HYHome</h2>
      <button onClick={increment}>+1</button>
    </div>
  )
})

export default memo(function APP() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('hello world')
  // const increment = useCallback(() => {
  //   setCount(count + 1)
  // },[count])

  // 因为当count发生变化时，也使用的是同一个函数
  // 做法一: 将count移除,但有闭包陷阱
  // 做法二: 使用useRef
  const countRef = useRef()
  countRef.current = count
  const increment = useCallback(() => {
    setCount(countRef.current + 1)
  }, [])

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>
      <HYHome increment={increment} />

      <h2>message: {message}</h2>
      <button onClick={() => setMessage(Math.random())}>修改message</button>
    </div>
  )
})
