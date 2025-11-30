import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

const HYDOM = memo(forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        console.log('focus')
        inputRef.current.focus()
      },
      setValue: (value) => {
        console.log('setValue')
        inputRef.current.value = value
      }
    }
  })
  return (
      <input type="text" ref={inputRef} />
  )
}))

export default memo(function APP() {
  const titleRef = useRef()
  const inputRef = useRef()

  function handleDOM() {
    console.log(titleRef.current)
    console.log(inputRef.current)
    inputRef.current.focus()
    inputRef.current.setValue("Hello World")
  }

  return (
    <div>
      <h2 ref={titleRef}>title</h2>
      <HYDOM ref={inputRef} />
      <button onClick={handleDOM}>DOM操作</button>
    </div>
  )
})
