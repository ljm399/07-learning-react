import React, { memo, useEffect, useState } from 'react'

// 提取useEffect
function useCustomEffect(fn, deps) {
  useEffect(() => {
    console.log("组件挂载")
    return () => {
      console.log("组件卸载")
    }
  })
}

const Home = memo(function Home() {
  // useEffect(() => {
  //   console.log("组件挂载")
  //   return () => {
  //     console.log("组件卸载")
  //   }
  // })

  useCustomEffect()
  return <h2>Home</h2>
})
const About = memo(function About() {
  // useEffect(() => {
  //   console.log("组件挂载")
  //   return () => {
  //     console.log("组件卸载")
  //   }
  // })

  useCustomEffect()
  return <h2>About</h2>
})

export default memo(function APP() {
  useCustomEffect()
  const [isShow, setIsShow] = useState(true)
  return (
    <div>
      <h2>Custom Hooks</h2>
      <button onClick={() => setIsShow(!isShow)}>显示/隐藏</button>
      { isShow && <Home/>}
      { isShow && <About/>}
    </div>
  )
})
