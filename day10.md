# 0. 遇到代码问题

### 一. AI

### 二. 谷歌(用英文)

### 三.stand overflow

### 四. github中的issue -- 你遇到别人也一样



# 一. 其他Hooks

### 1.1. Redux的Hooks 

- useSelector
- useDispatch
- 重要内容
  - useSelector(state=> {}, shallowEqual)





- 无论是优化后还是原来都需要的配置 -- 只对APP.jsx里面的代码优化,逻辑js那些不变

```react
./modules/counter.js
import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        name: 'codecao'
    },
    reducers: {
        incrementAction: (state, { payload }) => {
            state.count += payload
        },
        decrementAction: (state, { payload }) => {
            state.count -= payload
        },
        changeNameAction: (state, { payload }) => {
            state.name = payload
        }
    }
})

export const { incrementAction, decrementAction } = counterSlice.actions
export default counterSlice.reducer

----------------------------------
store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
export default store


----------------------------
index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import APP from './day10-HooksOfredux/APP'
import { Provider } from 'react-redux'
import store from './day10-HooksOfredux/store'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
      <Provider store={store}>
        <APP />
      </Provider>
)
```

- 原本

  ```
  import { incrementAction, decrementAction } from "./store/modules/counter";
  import { connect } from "react-redux";
  import { memo } from "react";
  const App = memo((props) => {
    const { count, increment, decrement } = props
    function addNumberHandler(num, isAdd = true) {
      if (isAdd) {
        increment(num)
      } else {
        decrement(num)
      }
    }
    return (
      <div>
        <h2>当前计数：{count}</h2>
        <button onClick={() => addNumberHandler(1)}>+1</button>
        <button onClick={() => addNumberHandler(1, false)}>-1</button>
        <button onClick={() => addNumberHandler(5)}>+5</button>
        <button onClick={() => addNumberHandler(5, false)}>-5</button>
      </div>
    )
  })
  
  // 优化后这部分没有了
  const mapStateToProps = (state) => {
    return {
      count: state.counter.count
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      increment: (num) => dispatch(incrementAction(num)),
      decrement: (num) => dispatch(decrementAction(num))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)
  ```

- 优化后

  - 当父组件的count改变,子组件也渲染, 因为memo是随着props的改变而改变
    当使用了useSelector则 Home 组件通过 useSelector 订阅了 name 的值

    然后当 Redux store 更新时（即使只是 count 变了），所有 useSelector 的选择器函数（selector）都会重新执行

    shallowEqual作用: 

    - useSelector 的第二个参数 shallowEqual 就是为了解决这个问题的。它会“浅比较”上一次选择器返回的对象和这一次返回的新对象。

    - shallowEqual 会检查两个对象的键是否相同，以及对应的值是否严格相等 (===)。

    - 在这个例子中，因为 state.counter.name 的值没有变，所以 shallowEqual 的比较结果会是 true。

    - 当比较结果为 true 时，useSelector 不会 强制触发 Home 组件的更新。

  ```
  import React, { memo } from 'react'
  import { useSelector, useDispatch, shallowEqual } from 'react-redux'
  import { incrementAction, decrementAction } from './store/modules/counter'
  
  // 当父组件的count改变,子组件也渲染, 因为memo是随着props的改变而改变
  //当使用了useSelector则 Home 组件通过 useSelector 订阅了 name 的值
  const Home = memo((props) => {
    const {message} = useSelector(state => ({
      message: state.counter.name
    }), shallowEqual)
    console.log('Home组件渲染')
    return (
      <div>
        <h2>Home组件：{message}</h2>
      </div>
    )
  })
  
  export default memo(function APP() {
    // 1.使用useSelector将state中的数据映射到当前组件中
    const count = useSelector(state => state.counter.count)
    const name = useSelector(state => state.counter.name, shallowEqual)
  
    // 2.使用useDispatch直接派发action
    const dispatch = useDispatch()
    function addNumberHandler(num, isAdd = true) {
      if (isAdd) {
        dispatch(incrementAction(num))
      } else {
        dispatch(decrementAction(num))
      }
    }
    console.log("组件渲染")
    return (
      <div>
        <h2>当前计数：{count}</h2>
        <h2>当前姓名：{name}</h2>
        <Home />
        <button onClick={() => addNumberHandler(1)}>+1</button>
        <button onClick={() => addNumberHandler(1, false)}>-1</button>
        <button onClick={() => addNumberHandler(5)}>+5</button>
        <button onClick={() => addNumberHandler(5, false)}>-5</button>
      </div>
    )
  })
  
  ```

  







### 1.2. useId

#### 1.2.1. SSR相关知识 - 面试问到说这个

- SPA页面的缺点 -- CSR(客户端渲染)
  1. 不利于SEO优化
     - 因为百度google那些服务器后台会对所有网站进行爬虫,而SPA是单页面,展示的数据有限(比如只有title那些),故用户搜索时找不到,影响网站流量
  2. 首屏渲染速度比较慢
     - 因为SPA单页面,所以打开网站后这个单页面还要去加载所依赖的资源比如(img src='....')
- SSR(服务器渲染)的优点
  - 没有上面的缺点








#### 1.2.2. 同构应用

- 开发出来一个应用程序的代码,即可以在服务器端运行, 也可以在客户端运行
- 客户端运行的过程中: hydration





#### 1.2.3. useId

一套vue/angular/react代码在node运行,生成的index.html只是为了展示

逻辑比如点击按钮那些还需要相关代码在浏览器里面运行,然后插入到那个index.html文件中

- 这个插入就是hydrated/hydration

- id保持一致和唯一性

  - 而id保持一致,就是那套代码里面用到的动态数据在node执行后和浏览器执行后会不同,但使用useId就会保持一致
  - 优化效果: 因为底层会因为浏览器渲染的id变化所以重新渲染

  ```
  import { useId } form 'react'
  
  const App = memo(() => {
  	const id = useId()
  })
  
  以及
  <label htmlFor = {id}>
  	用户名: <input id={id} type= 'text'/>
  ```

  





### 1.3. useTransition

- 渲染优先级较低
- [pending, startTransition]
- faker-js

```
nameArray.js
import {faker} from '@faker-js/faker'
// const nameArray = Array(10).map(() => {
//   console.log('nh')
//不行加fill('')
//因为当你执行 const arr = Array(100) 时，你创建了一个 length 属性为 100 的新数组。但是，这个数组内部是空的，它没有任何索引（0, 1, 2, ... 99）。你可以把它想象成一个预定了 100 个座位的电影院，但实际上一个观众都还没坐下。
在浏览器控制台里，它会显示为 [empty × 100]。这表示有 100 个“空槽”，而不是 100 个 undefined。
.map() 方法的工作原理:在执行时会检查索引是否存在。如果一个索引在数组中根本不存在（就像 Array(100) 创建的数组那样），.map() 的回调函数就不会对该索引执行。
fill使得数组不再是空的了，它变成了一个包含 100 个空字符串的“密集”数组：['', '', '', ...]。电影院的每个座位上现在都坐上了一个“人”（即使只是一个占位的空字符串

const nameArray = Array(100).fill('').map(() => {
  return faker.person.fullName()
})

--------------------
//更加好的方法
const nameArray = Array.from({ length: 100 }, () => {
  return faker.person.fullName();
});
//Array.from() 的第一个参数可以是一个“类数组”对象，{ length: 100 } 就符合这个条件。它的第二个参数是一个映射函数，效果和 .map() 的回调一样。这种方式一步到位，避免了先 fill() 再 map() 的两步操作

export default nameArray
```



```
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

```



​	

### 1.4. useDeferredValue

- const copyData = useDeferreValue(数据)
- 效果和useTransition一样,但这个更简洁,然后你要用pend则用回useTransition

```
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

```







# 二. 项目的搭建

### 2.1. 项目的介绍开发规范





### 2.2.搭建项目的过程

#### 2.2.1. 项目的创建- 脚手架





#### 2.2.2. 项目的基本配置

- icon图标
- 标题
- jsconfig.json -- 方便vscode
  - 配置别名(即之后路径不需要.../../.)






#### 2.2.3.项目目录的结构

- base-ui: 所有项目依赖的基础UI(既这个项目用到,下个项目也用到)





#### 2.2.4. craco.config.js

- 修改配置问题: react隐藏了webpack
  - 解决方案一: npm run eject(自己改底层代码)
  - 方案二(推荐): craco => create-react-app config

- 项目的别名alias
  - npm install @craco/craco -D

- less文件的生效
  - 去ant Design官网配置






#### 2.2.5. CSS样式的重置 -- assets / reset.css

- normalize.css

- reset.css: 自己编写
  - 用 * {}
  
  - 或者h2, a, h1,h2 {} 这样列出来重置
  
    ```
    reset.less
    
    @import './variables.less';
    blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul {
      margin: 0;
      padding: 0;
    }
    
    a {
      color: @textColor;
      text-decoration: none;
    }
    
    img {
      vertical-align: top;
    }
    
    ul, li {
      list-style: none;
    }
    
    -------------------------------
    assets /index.less
    @import './reset.less';
    @import './common.less';
    
    
    ------------------------------------------
    index.js
    import 'normalize.css';
    import './assets/css/index.less';
    ```
  
    






#### 2.2.6. 路由的配置 -- router文件





#### 2.2.7. 状态的管理redux --- store

- 方式一:  createSlice
- 方式二 (普通的方式): 四个文件





#### 2.2.8. 网络请求axios封装 --- services

- HYRequest的封装
  - 用类来封装,因为类具有更强的内聚性
- 在home中测试使用



### 所有的编程都是为数据服务

##### 在公司,对数据进行处理尽量交给后端,然后前端

#### 他不做你就处理,在展示,不然是否乱





