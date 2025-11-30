import { memo, useEffect, useState } from "react"
const App = memo(() => {
  const [count, setCount] = useState(200)

  // 额外添加的副作用
  // document.title = count
  useEffect(() => {
    // 当前传入的回调函数会在组件渲染完成后自动执行
    // 网络请求/DOM操作(修改标题)/事件监听
    document.title = count
  })

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
})

export default App