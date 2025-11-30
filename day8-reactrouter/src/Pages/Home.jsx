import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { HYRouter } from '../hoc'


export class Home extends Component {
  
  navigate = (path) => {
    const { navigate } = this.props.router
    console.log(navigate)
    navigate(path)
  }
  render() {
    return (
      <div>
        <h4>home</h4>
        <div className="home-nav">
          <Link to="/home/ranking">排行榜</Link>

          {/* 在类中使用navigateTo方法 */}
          <button onClick={() => this.navigate('/home/songmenu')}>歌单</button>
        </div>
        <Outlet />
      </div>
    )
  }
}

export default HYRouter(Home)
