import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  login() {
    this.setState({ isLogin: true })
  }
  render() {
    const { isLogin } = this.state
    return (
      <div>
        <h1>登录</h1>
        {!isLogin ? <button onClick={e =>  this.login()}>登录</button> : <Navigate to="/home" />}
      </div>
    )
  }
}

export default Login
