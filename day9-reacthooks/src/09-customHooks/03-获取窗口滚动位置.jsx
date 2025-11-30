import React, { memo, useEffect } from 'react'
import { useScrollPosition } from './hooks'
import './sytle.css'

const Home = memo(function Home() {
  const { scrollX, scrollY } = useScrollPosition();

  return <h1>Home Component: {scrollX} {scrollY}</h1>
})

export default memo(function APP() {
  return (
    <div className='app'>
      <h1>APP Root Component</h1>
      <Home />
    </div>
  )
})
