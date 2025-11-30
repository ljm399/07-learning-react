import React, { memo, useState, useMemo } from 'react'
function calcNumTotal(count) {
  console.log('calcNumTotal')
  let total = 0
  for (let i = 0; i < count; i++) {
    total += i
  }
  return total
}

const HYInfo = memo(function HYInfo(props) {
  const {info} = props
  console.log("HYInfo render")
  return (
    <div>
      <h2>info: {info.name}</h2>
    </div>
  )
})

export default memo(function APP() {
  const [count, setCount] = useState(0)
  const result = useMemo(() => {
    return calcNumTotal(count)
  },[count])


  const info = {name: 'codecao', age: 23}
  //用法二: 传给子组件对象时,子组件不会多次渲染
  // const info = useMemo(() => {
  //   return {name: 'codecao', age: 23}
  // },[])
  
  return (
    <div>
      <h2>count: {count}</h2>
      <h2>result: {result}</h2>
      <button onClick={() => setCount(10)}>setCount(10)</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <HYInfo info={info} />
    </div>
  )
})
