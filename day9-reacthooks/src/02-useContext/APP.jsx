import React, { memo, useContext } from 'react'
import { UserContext, ThemeContext } from './context'

export default memo(function App() {
  const {name, age} = useContext(UserContext)
  const {color, size} = useContext(ThemeContext)
  return (
    // <div>
    //   <UserContext.Consumer>
    //     {(user) => {
    //       return (
    //         <div>
    //           <h2>name: {user.name}, age: {user.age}</h2>
    //           <ThemeContext.Consumer>
    //             {(theme) => {
    //               return <h2>color: {theme.color}</h2>
    //             }}
    //           </ThemeContext.Consumer>
    //         </div>
    //       )
    //     }}
    //   </UserContext.Consumer>
    // </div>

    // 改进
    <div>
      <h2>name: {name}, age: {age}</h2>
      <h2 style={{color: color, fontSize: size}}>Theme</h2>
    </div>
  )
})
