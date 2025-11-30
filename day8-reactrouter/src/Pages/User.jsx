import React, { Component } from 'react'
import { HYRouter } from '../hoc'

export class User extends Component {
  render() {
    const { router } = this.props
    const  { query } = router
    const { name, age } = query
    return (
      <div>
        <h1>用户</h1>
        <p>name: {name}</p>
        <p>age: {age}</p>
      </div>
)
  }
}

export default HYRouter(User)