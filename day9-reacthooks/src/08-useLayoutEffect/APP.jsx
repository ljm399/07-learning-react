import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

export default memo(function APP() {
  const [count, setCount] = useState(100)

  // 无闪烁
  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect")
  //   if (count === 0) {
  //     setCount(Math.random() + 100)
  //   }
  // })

  // 有闪烁
  useEffect(() => {
    console.log("useEffect")
    if (count === 0) {
      setCount(Math.random() + 100)
    }
  })

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(0)}>count设置为0</button>
    </div>
  )
})
