import React, { memo, useState, useDeferredValue } from 'react'
import nameArray from './namesArray'

export default memo(function APP() {
  const [showNames, setShowNames] = useState(nameArray)
  const deferedShowNames = useDeferredValue(showNames)
  const valueChangeHandler = (e) => {
    const value = e.target.value
    const filteredNames = nameArray.filter(item => item.includes(value))
    setShowNames(filteredNames)
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandler}/>    
      <ul>
        {
          deferedShowNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})
