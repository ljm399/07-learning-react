# 一.Redux核心原理(了解)

### 1.1. 中间件的实现原理 - 日志(log) 和 thunk

- log 与 猴补丁(moneky patch) : store.dispatch = logAndDispatch

  - ```
    在index文件中
    function log(store) {
    	const next = store.dispatch
    	
    	function logAndDispatch(action) {
    		clg("当前派发的action", action)
    		// 真正需要派发的代码,使用之前的dispatch进行派发
    		next(action)
    		clg('派发之后的结果', store.getState)
    	}
    	
    	// monkey patch: 修改现有的代码,对整体的执行逻辑进行修改
    	store.dispatch = logAndDispatch
    }
    log(store)
    ```

  - 猴补丁作用原理

    ```
    用户调用 store.dispatch(action)
            ↓
        logAndDispatch 函数执行
            ↓
    1. 打印 "当前派发的action"
            ↓  
    2. 调用 next(action) [原始dispatch]
            ↓
    3. 打印 "派发之后的state" 
    ```




### 1.2. applyMiddleware原理

- thunk : 关键store.dispatch = dispatchThunk

  - ```react
    function thunk(store) {
    	const next = store.dispatch
    	function dispatchThunk(action) {
    		if(typeof action === "function") {
    			action(store.dispatch, store.getState)
    		} else {
    			next(action)
    		}
    	}
    	store.dispatch = dispatchThunk
    }
    export default thunk
    ```



### 1.3. log函数和thunk代码优化

-  位置优化

  - 创个middleware文件夹

  - 创thunk.js 和 log.js 放源码

  - index.js

    ```react
    import log from "./log"
    import thunk from "./thunk"
    export { log, thunk }
    ```

  - 因为要是有多个中间件则 下面问题 代码多,逻辑差

    ```react
    log(store)
    thunk(store)
    log(store)
    thunk(store)log(store)
    thunk(store)
    ```

    - 解决: 在Middleware文件夹中创个 applyMiddleware.js

      ```react
      function applyMiddleware(store, ...fns) {
        fns.forEach(fn => {
          fn(store)
        })  
      }
      export default applyMiddleware
      ```

    - 则调用

      ```
      直接 applyMiddleware(store, log, thunk)
      ```

      









### 1.4. React状态管理选择

- 方式一: this.state/useState: 组件管理状态
  - UI相关组件之间的数据,不包括逻辑如网络请求那些在组件中

- 方式二: Context
  - 主题相关数据

-  方式三: Redux
  - 其他都在这里面






# 二. React Router6.x(重要)

### 2.1.Router的基本使用

- 安装 npm install react-router-dom
- 配置BrowserRouter/HashRouter => App
  - 开发用hash -- 因为路径有 #  如 Baidu.com/ # / ...


```react
index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
);
```



- 配置映射关系: Routes => Route => path/element
- Link: to 属性
  - 其他属性: replace: boolean; 默认是push(即直接跳转到下一个页面可以返回,replace不可以)
  - reloadDocument: boolean; 要不要重新加载一下文件

```javascript
 App.js
<Link to="/home">首页</Link>
<Link to="/about">关于</Link>
{/* 使用Navigation组件 */}
<Link to="/login">登录</Link>

 
 <Routes>
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
</Routes> 
```







### 2.2. NavLink使用

- {/* NavLink组件 */}
  
- *{/* 可以往{}中传入一个函数，因为NavLink是个组件,传输时发现你是个函数,会自动调用这个函数,
  - 而普通标签如<p>{}</p>不可以传函数,因为它不是组件 */}
- className 和 style

```javascript
App.js   
const changeActive = ({isActive}) => {
     return isActive ? 'link-active' : ''
  }
{/* 通过内联样式实现点击后字体变绿 */}
//方式一
{/* <NavLink to="/home" style={({isActive}) => ({color: isActive ? 'green' : ''})}>首页</NavLink>
<NavLink to="/about" style={({isActive}) => ({color: isActive ? 'green' : ''})}>关于</NavLink> */}

//方式二: 导入style.css
a.active {
  color: green;
  font-size: 20px;
}
{/* <NavLink to="/home"}>首页</NavLink>
<NavLink to="/about"}>关于</NavLink> */}


// className
{/* 由于使用active,会与其他标签的active冲突,所以改名 */}
// 这里的isActive是解构出来的!
{/* <NavLink to="/home" className={({isActive}) => isActive ? 'link-active' : ''}>首页</NavLink>
<NavLink to="/about" className={({isActive}) => isActive ? 'link-active' : ''}>关于</NavLink> */}

{/* 由于{}是传入函数,故可以提取出来 */}
{/* 因为没用到this,所有不需要this.changeActive(),少个括号 */}
这里是在函数式组件,所以不用this.changeActive,而是changeActive
{/* <NavLink to="/home" className={changeActive}>首页</NavLink>
<NavLink to="/about" className={changeActive}>关于</NavLink> */}
```





### 2.3.Navigate组件和NotFound页面配置

```javascript
App.js
import { Routes, Route, Link, NavLink, Navigate, useNavigate, useRoutes } from 'react-router-dom'
<Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          ....
          <Route path="*" element={<NotFound />} />
</Routes> 
```





### 2.4. 代码进行跳转  -- 函数式组件 

- 虽然现在都往函数式编程转,但公司有些代码是以类组件为主

- useNavigate函数式组件 -- 只能在函数式组件中,类组件会报错, 同时要满足放在顶层(即函数的第一个{}),以及

  - 需要满足的条件

    1. 函数式组件中,类组件会报错
    2. 函数的顶层,要是if(true) {}的{}里面会报错
    3. 要开启/* eslint-disable react-hooks/rules-of-hooks */  -- 让其知道这是个组件,同时有问题返回warn而不是errror

  - 解决类组件无法使用navigate问题 -- 高阶组价(拦截,处理,返回) : HYRouter

    - 高阶组件本质就是函数

    ```javascript
    hoc/HYRouter.js中
    /* eslint-disable react-hooks/rules-of-hooks */
    import { useNavigate } from 'react-router-dom'
    
    function HYRouter(Component) {
      return function(props) {
        // 1. 导航
        const navigate = useNavigate()
        const router = { navigate} 
        return <Component {...props} router={router} />
      }
    }
    /* eslint-enable react-hooks/rules-of-hooks */
    
    export default HYRouter
    
    ---------------------------------------
    App.js
    <Route path="/home" element={<Home />} />
                <Route path='/home' element={<Navigate to="/home/ranking" />}
     
     
    -------------------------------------------- 
    Pages/Home.js
    解决在类中使用navigate, 高阶组件
    import React, { Component } from 'react'
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
              {/* 在类中使用navigateTo方法 */}
              <button onClick={() => this.navigate('/home/songmenu')}>歌单</button>
            </div>
        )
      }
    }
    export default HYRouter(Home)
    ```

  - 要开启/* eslint-disable react-hooks/rules-of-hooks */  -- 让其知道这是个组件,同时有问题返回warn而不是errror

    - 解释

      ```javascript
      // 这种模式在 React Hooks 早期是很常见的写法，现在主要是工具链变得更严格了
      // 现在这样命名后，ESLint 应该能识别 WithRouter 是一个组件
      
      // 方式一: 上面那个不是注释 ,ESLint 解析器会读取所有注释
      // 识别特定格式（以 eslint- 开头的注释
      // 作用:降低 ESlint的严格程度, 让代码通过检查(把errro变为warn)
      
      // 方式二可以在 package.json 中添加配置
      // "eslintConfig": {
      //   "extends": [
      //     "react-app",
      //     "react-app/jest"
      //   ]
      // }
      ```

      




​	

### 2.5. 路由嵌套的使用

- Rounte => 子Route
- OutLet占位

```javascript
App.js
{/* <Routes>
  <Route path="/home" element={<Home />} />
    <Route path='/home' element={<Navigate to="/home/ranking" />} />
    <Route path="/home/ranking" element={<HomeRanking />} />
    <Route path="/home/songmenu" element={<Songmenu />} />
    <Route path="/home/songdetail/:id" element={<HomesongDetail />} />
</Routes> */}

--------------------------------------------
Pages/home.jsx
import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
export class Home extends Component {
  render() {
    return (
      <div>
        <h4>home</h4>
        <div className="home-nav">
          <Link to="/home/ranking">排行榜</Link>
        </div>
        <Outlet />
      </div>
    )
  }
}


```







### 2.6. 路由传递参数

- detail/:id

  - useParams

    ```javascript
    App.js
    <Route path="/home/songdetail/:id" element={<HomesongDetail />} />	
    
    ----------------------------------------
    Pages/Homesongmenu.jsx
    import React, { Component } from 'react'
    import { HYRouter } from '../hoc'
    
    export class Songmenu extends Component {
      constructor(props) {
        super(props)
        this.state = {
          songmenu: [
            { id: 1, name: '《爱你不是两三天》' },
            { id: 2, name: '《后来》' },
            { id: 3, name: '《十年》' },
          ]
        }
      }
      
      NavigateToDetail(id) {
        const { navigate } = this.props.router
        // 修复：使用绝对路径
        navigate("/home/songdetail/" + id)
      }
      render() {
        const { songmenu } = this.state
        return (
          <div>
            <h2>歌单</h2>
            <ul>  
              {
                songmenu.map((item) => {
                  return <li key={item.id} onClick={e => this.NavigateToDetail(item.id)}>{item.name}</li>
              })
            }
            </ul>
          </div>
        )
      }
    }
    // 使用HYRouter,为了在类组件中使用navigate
    export default HYRouter(Songmenu)
    
    
    ------------------------------
    Pages/HomesongDetail.jsx
    import React, { Component } from 'react'
    import { HYRouter } from '../hoc'
    export class HomesongDetail extends Component {
      render() {
        const { router } = this.props
        const { params } = router
        return (
          <div>
            <h2>歌曲详情</h2>
            <h3>id: {params.id}</h3>
          </div>
        )
      }
    }
    // 使用HYRouter,为了拿到Params
    export default HYRouter(HomesongDetail)
    
    ----------------------------------
    hoc/HYRouter.js
    /* eslint-disable react-hooks/rules-of-hooks */
    import { useNavigate, useParams } from 'react-router-dom'
    
    function HYRouter(Component) {
      return function(props) {
        // 1. 导航
        const navigate = useNavigate()
    
        // 2. 动态路由的参数: id
        const params = useParams()
    
        // 3. 查询字符串的参数: /user?name=codecao&age=23
        const [searchParams] = useSearchParams()
        const query = Object.fromEntries(searchParams)
    
        // 4. 获取当前的路径
        const location = useLocation()
        const pathname = location.pathname
    
        const router = { navigate, params, query, pathname } 
        return <Component {...props} router={router} />
      }
    }
    /* eslint-enable react-hooks/rules-of-hooks */
    
    export default HYRouter
    ```

代码解释

```javascript
const [searchParams] = useSearchParams() -- useSearchParams是个数组, [] 用来解构数组,等到的是?name=codecao&age=23
const query = Object.fromEntries(searchParams) 等于 Object.formEntries(searchParams.entries()) 即searchParams的entries可以不加
- Object.fromEntries会把?name=codecao&age=23 转变为对象格式


```



​				

​	  		   





- queryString

  - /user?xxxx
  - useSearchParams

  ```javascript
  也使用了HYRouter.js 看上面
  hoc/HYRouter.js
  /* eslint-disable react-hooks/rules-of-hooks */
  import { useNavigate, useParams } from 'react-router-dom'
  
  function HYRouter(Component) {
    return function(props) {
      // 1. 导航
      const navigate = useNavigate()
  
      // 2. 动态路由的参数: id
      const params = useParams()
  
      // 3. 查询字符串的参数: /user?name=codecao&age=23
      const [searchParams] = useSearchParams()
      const query = Object.fromEntries(searchParams)
  
      // 4. 获取当前的路径
      const location = useLocation()
      const pathname = location.pathname
  
      const router = { navigate, params, query, pathname } 
      return <Component {...props} router={router} />
    }
  }
  /* eslint-enable react-hooks/rules-of-hooks */
  
  export default HYRouter
  
  ----------------------------------------------------
  App.js
  import React, { Component } from 'react'
  import { Routes, Route, Link, NavLink, Navigate, useNavigate, useRoutes } from 'react-router-dom'
  <Link to="/user?name=codecao&age=23">用户</Link>
  
  --------------------------------------------------------
  Pages/User.jsx
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
  ```

  

#### 2.6.2.location作用

```
const location = useLocation()
const pathname = location.pathname
clg(location) 
//*
	// {
    //   pathname: "/home/songmenu",
    //   search: "?search=流行音乐", 
    //   hash: "#top",
    //   state: null,
    //   key: "default"
// }
*//

-----------------------------------
其他组件中
render() {
  const { pathname } = this.props.router
  
  return (
    <div>
      {pathname === '/home/songmenu' && <h2>当前在歌单页面</h2>}
      {pathname === '/home/ranking' && <h2>当前在排行榜页面</h2>}
      {pathname.includes('/home/songdetail') && <h2>当前在歌曲详情页面</h2>}
    </div>
  )
}
```









### 2.7.路由的配置方式

- useRoutes(routes)

- routes = [{},{}]

  ```javascript
  App.js
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
  </Routes>
  
  ------------------------------------
  router/index.js
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
  ```

  





### 2.8.路由的懒加载

- React.lazy(() => import())

  ```javascript
  router/index.js
  // 懒加载 和 魔法注释
  const About = React.lazy(() => import(/* webpackChunkName: "about" */ '../Pages/About'))
  // import() 返回的是promise
  ```

  - 作用: 当npm run build和部署到服务器时,不是所有的文件同时加载,而是加载你指定的懒加载的文件,这样有效率

  - 一旦对某个文件设立懒加载,则只要用这个文件,那打包(npm run build)就会单独划分出这个文件

- Suspense fallback

  - 作用: 当文件加载是显示你设定的样式 如 load......

    ```javascript
    router/index.js
    import { Suspense } from 'react';
      {
        path: '/about',
        element:<React.Suspense fallback={<div>Loading...</div>}>
          <About />
        </React.Suspense>
      },
            
    -----------------------------------
    以及 index.js
    import { Suspense } from 'react';
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
    );
    ```

    





# 三. React Hooks(重要)

### 3.1. Hooks介绍 -- 不用安装

- 函数式组件缺点(相对类组件)

  - 不可以定义自己的内部的状态,每次调用都会产生新的临时变量

  - 没有生命周期

  - 不可以调用render(),导致UI无法实现响应式

- 类组件的缺点

  - 复杂
  - 难度
  - 复用

- hooks

  - 它可以让我们不编写类的情况下使用state以及其他React特性

  - 所以延伸许多用法

  - 如果是个旧的项目,不用全重构为hook,因为它完全向下兼容,之后编写用hook就行

  - hook只能在函数组价中使用,不能在类组件或函数之外的地方使用

  - 可以不学,只用类组件也行,但开发效率较低

    

  

  

### 3.2. 计算器案例

- 类组件实现

  - ```react
    import React, { PureComponent } from 'react'
    export default class Counter extends PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                counter: 0
            }
        }
        render() {
            return (
            	<div>
                    <h2>当前计数为: {this.state.counter}</h2>
                    <button onClick={e=>this.increament()}>+1 </button>
                    <button onClick={e=>this.decrement()}>-1 </button>
                </div>
            )
        }
        increament() {
            this.setState({counter: this.state.counter +1})
        }
        decrement() {
                    this.setState({counter: this.state.counter -1})
        }
    }
    ```
  - 

- 函数式组件 + Hooks

  - ```react
    import React, { useState } from 'react'
    export default function Counter() {
    	const [count, setCount] = useState(0)
    	return (
    		<div>
            	<h2>当前计数: {count}</h2>
                <button onClick={e=>setCount(count+1)}>+1</button>
                <button onClick={e=>setCount(count-1)}>-1</button>	
            </div>
    	)
    }
    ```

    

  - 原理:
    - 当点击按钮,则会把事件传给底层代码,它通过对比setCount来调用底层相关代码使得count改变
    - 同时它哪里会储存count的值
    - 下次再点击时,用的就是上次储存的count



### 3.3. useState细节

- const [count, setCount] = useState(0)
  - 就一个参数,不传则为undefined
  - 返回值
    - 第一个参数(count): 当前状态值,不是某个具体值(因为第二次回来就变为其他值)
    - 第二个参数(setCount): 设置状态值的函数
  
- hook就是个JavaScript函数,他可以帮你钩入React State以及生命周期等特性

- 规则

  - 只能在最外层使用hook,不要在内循环,条件判断或子函数中调用如if(true){ 里面不行 }

  - 只能React的函数组件中调用hook,不要在其他JavaScript函数中调用

    - React的函数一般有export default memo(函数名) 或 函数名(props) {}

    - 除非自定义的hooks中, 则函数名必须以 use 开头

      ```
      function useFoo() {..}
      ```

      

- 名称问题
  
  - useState,而不是 creatState
  
    - 因为第二次回调则不会新创立个State,而是use
  
  - hook指的是useState useEffect这样的函数
    - useState : 钩入数据
    - useEffect: 钩入生命周期函数那些
  
  - hooks指的是这类函数的统称
  
    
  









