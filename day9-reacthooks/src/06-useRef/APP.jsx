import React, { memo, useState, useRef } from 'react'

let obj = null
export default memo(function APP() {
  const [count, setCount] = useState(0)
  const nameRef = useRef()
  console.log(obj === nameRef)
  obj = nameRef
  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
})
