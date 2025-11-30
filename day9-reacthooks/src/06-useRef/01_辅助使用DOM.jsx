import React, { memo, useRef } from 'react'

export default memo(function APP() {
  const titleRef = useRef()
  const inputRef = useRef()

  function showTitleDOM() {
    console.log(titleRef)
    console.log(inputRef)
    console.log(titleRef.current)
    inputRef.current.focus()
  }
  return (
    <div>
      <h2 ref={titleRef}>Hello World</h2>
      <input ref={inputRef} type="text" />
      <button onClick={showTitleDOM}>查看showTitleDOM</button>
    </div>
  )
})
