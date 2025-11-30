import Home from '../Pages/Home'
// import About from '../Pages/About'
import Login from '../Pages/Login'
import NotFound from '../Pages/NotFound'
import HomeRanking from '../Pages/HomeRanking'
import Songmenu from '../Pages/Homesongmenu'
import HomesongDetail from '../Pages/HomesongDetail'
import User from '../Pages/User'
import { Navigate } from 'react-router-dom'
import React from 'react'
// 懒加载 和 魔法注释
const About = React.lazy(() => import(/* webpackChunkName: "about" */ '../Pages/About'))
// import() 返回的是promise


const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home/ranking',
        element: <HomeRanking />
      },
      {
        path: '/home/songmenu',
        element: <Songmenu />
      },
      {
        path: '/home/songdetail/:id',
        element: <HomesongDetail />
      }
    ]
  },
  {
    path: '/about',
    element: <React.Suspense fallback={<div>Loading...</div>}>
      <About />
    </React.Suspense>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/user',
    element: <User />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes