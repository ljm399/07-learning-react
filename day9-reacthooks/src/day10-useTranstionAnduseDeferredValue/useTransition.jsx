import React, { memo, useState, useTransition } from 'react'
import nameArray from './namesArray'

export default memo(function APP() {
  const [showNames, setShowNames] = useState(nameArray)
  const [pending, startTransition] = useTransition()
  const valueChangeHandler = (e) => {
    const value = e.target.value
    startTransition(() => {
      const filteredNames = nameArray.filter(item => item.toLowerCase().includes(value.toLowerCase()))
      setShowNames(filteredNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandler}/>    
      <h2>用户列表: {pending ? '加载中...' : '加载完成'}</h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})
