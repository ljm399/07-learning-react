import React, { Component } from 'react'
import { Routes, Route, Link, NavLink, Navigate, useNavigate, useRoutes } from 'react-router-dom'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Login from './Pages/Login'
// import NotFound from './Pages/NotFound'
// import HomeRanking from './Pages/HomeRanking'
// import Songmenu from './Pages/Homesongmenu'
// import HomesongDetail from './Pages/HomesongDetail'
// import User from './Pages/User'
// import './App.css'
import routes from './router'

export function App(props) {
  // 只能在函数组件中使用useNavigate()
  const navigate = useNavigate()
  
  const changeActive = ({isActive}) => {
    return isActive ? 'link-active' : ''
  }

  function goHome(path) {
    navigate(path)
  }
  
  function goAbout(path) {
    navigate(path)
  }
  
  function goLogin(path) {
    navigate(path)
  }

  return (
    <div>
      <div className="header">
        <h3>header</h3>
        

        {/* NavLink组件 */}
        {/* 可以往{}中传入一个函数，因为NavLink是个组件,传输时发现你是个函数,会自动调用这个函数,而普通标签如<p>{}</p>不可以传函数,因为它不是标签 */}
        {/* 通过内联样式实现点击后字体变绿 */}
        {/* <NavLink to="/home" style={({isActive}) => ({color: isActive ? 'green' : ''})}>首页</NavLink>
        <NavLink to="/about" style={({isActive}) => ({color: isActive ? 'green' : ''})}>关于</NavLink> */}

        {/* 由于使用active,会与其他标签的active冲突,所以改名 */}
        {/* <NavLink to="/home" className={({isActive}) => isActive ? 'link-active' : ''}>首页</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'link-active' : ''}>关于</NavLink> */}

        {/* 由于{}是传入函数,故可以提取出来 */}
        {/* 因为没用到this,所有不需要this.changeActive(),少个括号 */}
        {/* <NavLink to="/home" className={changeActive}>首页</NavLink>
        <NavLink to="/about" className={changeActive}>关于</NavLink> */}

        <Link to="/home">首页</Link>
        <Link to="/about">关于</Link>
        {/* 使用Navigation组件 */}
        <Link to="/login">登录</Link>

        {/* 普通标签当导航 */}
        <h3>-----------普通标签当导航---------------------</h3>
        {/* 方式一 */}
        {/* <button onClick={() => navigate('/home')}>首页</button>
        <button onClick={() => navigate('/about')}>关于</button>
        <button onClick={() => navigate('/login')}>登录</button> */}

          {/* 方式二 */}
        <button onClick={() => goHome('/home')}>首页</button>
        <button onClick={() => goAbout('/about')}>关于</button>
        <button onClick={() => goLogin('/login')}>登录</button>

        <Link to="/user?name=codecao&age=23">用户</Link>
      </div>
      <hr/> 

      <div className="content">
        {/* 方式一: */}
        {/* <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
            <Route path='/home' element={<Navigate to="/home/ranking" />} />
            <Route path="/home/ranking" element={<HomeRanking />} />
            <Route path="/home/songmenu" element={<Songmenu />} />
            <Route path="/home/songdetail/:id" element={<HomesongDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes> */}

        {/* 方式二: */}
        {useRoutes(routes)}
      </div>


      <hr />
      <div className="footer">
        <h3>底部</h3>
      </div>
    </div>
  )
}

export default App
