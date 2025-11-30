# 0.useState(在day8讲)

###  useState细节

- const [count, setCount] = useState(0)
  - 就一个参数,不传则为undefined
  
  - 返回值
    - 第一个参数(count): 当前状态值,不是某个具体值(因为第二次执行就变为其他值)
    
      - 可以传一个函数
    
        ```
         const [data, setData] = useState(() => {
            const item = localStorage.getItem(key);
            if (!item) return null;
        
            // 解析JSON字符串为对象
            return JSON.parse(item);
          }); // 当执行了setData,则传入的函数的返回值会赋值给data
        ```
    
        
    
    - 第二个参数(setCount): 设置状态值的函数





### hooks细节

- hook就是个JavaScript函数,他可以帮你钩入React State以及生命周期等特性

- 规则

  - 只能在最外层使用hook,不要在内循环,条件判断或子函数中调用如if(true){ 里面不行 }

  - 只能React的函数组件中调用hook,不要在其他JavaScript函数中调用

    - React的函数一般有export default memo(函数名) 或 函数名(props) {}

    - 除非自定义的hooks中, 则函数名必须以 use 开头

      ```
      function useFoo() {..}
      ```

      

  

# 一. useEffect(和前面的useState占90%)

之前使用(类组件中/声明周期)

```react
import React, { Component } from 'react'

export class APP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    document.title = this.state.count
  }
  componentDidUpdate() {
    document.title = this.state.count
  }

  render() {
    const {count} = this.state
    return (
      <div>
        <h1>count: {count}</h1>
        <button onClick={() => this.setState({count: count + 1})}>+</button>
      </div>
    )
  }
}

export default APP

```



### 基本使用(改进)

```react
import { memo, useEffect, useState } from "react"

const App = memo(() => {
  const [count, setCount] = useState(200)

  // 额外添加的副作用
  // document.title = count
  useEffect(() => {
    // 当前传入的回调函数会在组件渲染完成后自动执行
    // 网络请求/DOM操作(修改标题)/事件监听
    document.title = count
  }, [count])

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
})

export default App
```



### 清除副作用: 回调函数有返回值

- 放回值: 在组件更新和卸载时执行清除操作

- 副作用: 就是如同Document.title = 'xx' 这段代码是额外的,不应该和渲染的代码一起执行,而是放在useEffect

  ```react
  useEffect(() => {
  	进行监听的代码
  	
  	return () => {
  		取消监听的代码
  	}
  })
  ```

- 作用
  - 每个effect都可以返回一个清除函数
  - 增加内聚性: 将添加和移除的逻辑放在一起



### 多个Effect的使用

- 作用: 
  - 解决类中生命周期要将很多逻辑放在一起的问题
    - 比如网络请求,事件监听都要放在类中的componentDidMount
  - 允许我们按照代码的用途分离他们,而不是想生命周期函数(不可以分离)一样

```react
useEffect(() => {
	代码(1行):关于网络请求的
})
useEffect(() => {
	代码(10行): 关于redux数据监听
	reutrn () => {
		//取消监听
	}
})
useEffect(() => {
	代码(10行): 关于其他数据监听
	reutrn () => {
		//取消监听
	}
})
...
```

### useEffect使得hook函数可以模拟类组件的生命周期,但比生命周期更加强大



### useEffect依赖

- useEffect有两个参数
  - 执行的回调函数
  -  依赖那个state变化,在重新执行

```
  useEffect(() => {
    document.title = count
  }, [count]) //依赖count变化
  
  要是只希望执行一次
  useEffect(() => {
    document.title = count
  }, []) // 传个控制就行
```









# 二. useContext(特殊场景)

```react
index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContext, ThemeContext } from './02-useContext/context'
// import APP from './01-useEffect/APP'
import APP from "./02-useContext/APP"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContext.Provider value={{name: 'why', age: 18}}>
    <ThemeContext.Provider value={{color: 'red', size: 18}}>
      <APP />
    </ThemeContext.Provider>
  </UserContext.Provider>
)
```



```react
./02-useContext/context/index.js
import { createContext } from "react"
const UserContext = createContext()
const ThemeContext = createContext()

export { UserContext, ThemeContext }
```



##### 原本使用context

```react
export default memo(function App() {
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
  )
})

```



##### 改进

```
02-useContext/APP.jsx

import React, { memo, useContext } from 'react'
import { UserContext, ThemeContext } from './context'

export default memo(function App() {
  const {name, age} = useContext(UserContext)
  const {color, size} = useContext(ThemeContext)
  return (
    <div>
      <h2>name: {name}, age: {age}</h2>
      <h2 style={{color: color, fontSize: size}}>Theme</h2>
    </div>
  )
})

```





# 三. useReducer(了解)

- 除非定义的数据十分复杂,且数据是动态(比如非常多的数据要const [age, setage] = useState(0)) 而不是 const code = '曹'
- 缺点二:
  - 把所有的逻辑放在了reducer,导致十分用臃肿
- 优点: 帮你复习一下reducer,因为现在大部分公司可能还是使用reducer而不是toolkit
- 盲区: useReducer不是 Reducer的替代品,而是useState的

```react
import React, { memo, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {counter: state.counter + action.num, name: state.name}
    case 'decrement':
      return {counter: state.counter - action.num, name: state.name}
    default:
      return state
  }
}

export default memo(function APP() {
  //原本定义数据和修改数据
  // const [counter, setCounter] = useState(0)
  // const [name, setName] = useState('codecao')
  // const [age, setAge] = useState(18)
  // const increment = () => {
  //   setCounter(counter + 1)
  // }
  // const decrement = () => {
  //   setCounter(counter - 1)
  // }
    
 const [counter, dispatch] = useReducer(reducer, {counter: 0, name: 'codecao', age: 18})
  return (
    <div>
      <h2>counter: {counter.counter}</h2>
      <h2>name: {counter.name}</h2>
      <h2>age: {counter.age}</h2>
      <button onClick={() => dispatch({type: 'increment', num: 1})}>+1</button>
      <button onClick={() => dispatch({type: 'increment', num: 5})}>+5</button>
      <button onClick={() => dispatch({type: 'decrement', num: 1})}>-1</button>
      <button onClick={() => dispatch({type: 'decrement', num: 5})}>-5</button>
    </div>
  )
})

```







# 四. useCallback(渐进学习)

#### 性能问题

1. 每次点击都会创建increment函数
2. 但内存不会保持它,因为没有人引用它,故销毁

```react
import React, { memo, useState } from 'react'

export default memo(function APP() {
  const [count, setCount] = useState(0)
  
  function increment() {
    setCount(count + 1)
  }
  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>
    </div>
  )
})
```



#### 使用useCallback 依旧有这个问题

```
const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])
  
因为每次执行都会创建个函数,只不过当个参数传给了useCallback
```



#### useCallback属性

- 两个参数
  - 函数
  - 不是依赖那个state(那个状态改变就跟着改变),而是拿到最新的那个state
- 和useEffect区别
  - useCallback相当于给一个函数添加了只要第二个参数state变了,那在执行这个函数时放回的函数就变的属性,否则每次执行都是一样的函数
    - 可以保存到一个值(如下图的increment)来传递
    - 第二个参数是为了拿到最新的状态,再决定返回的是不变还是变化的函数给increment
    - 然后每次点击,increment都是会执行的,无论第二个参数有无改变
  - 而useEffect只是会执行里面的函数,同时也依赖其第二个参数来判断要不要执行第二或N次



#### 其优化的点:使得传给子组件的props不变,则子组件不会重新渲染,故优化

- 实现过程

  - 返回的函数传递给子组件

  - 闭包陷阱/ 闭包知识回顾

    - ```
        const increment = useCallback(() => {
          setCount(count + 1)
        }, [])
        第二个参数必传入count,不然每次执行increment函数时,count都是原来那个默认值(  const [count, setCount] = useState(0)) 即 0, 每次点击都是1,不会再增加(因为第一次会执行)
      ```

      

  - 代码

    - 点击修改message,则count不变,故HYHome子组件的props不变,故HYHome不行渲染,达到优化效果

```react
import React, { memo, useState, useCallback } from 'react'
const HYHome = memo(function HYHome(props) {
  const {increment} = props
  console.log('HYHome render')
  return (
    <div>
      <h2>HYHome</h2>
      <button onClick={increment}>+1</button>
    </div>
  )
})

export default memo(function APP() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('hello world')
  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>
      <HYHome increment={increment} />

      //  点击修改message,count不变,故HYHome子组件的props不变,故不会修改
      <h2>message: {message}</h2>
      <button onClick={() => setMessage(Math.random())}>修改message</button>
    </div>
  )
})

```





- useRef进一步进行优化

  - 因为每次点击增加,子组件都会再次渲染
  - 优化 - 使用useRef

  ```react
  const [count, setCount] = useState(0)  
  const countRef = useRef()
  countRef.current = count
  const increment = useCallback(() => {
      setCount(countRef.current + 1)
  }, [])
  ```

  - 实现原理解释
    - 点击触发increment函数,countRef.current+1,而决定useCallback返回给increment那个函数是否变化的第二个参数不变(因为一直是[]), 所以increment不变,所以子组件不会渲染
    - 而渲染后的界面的count (即<div>{count} ) 依旧不断+1 原因:
      - 每次点击导致increment函数执行,setCount也执行,然后hooks底层代码会被传入的参数赋值给count (const [count, setCount] = useState(0)里面的count)
      - 当下次点击,从上到下执行代码,const countRef = useRef(), countRef.current又重新被赋值最新的count







# 五. useMemo(渐进学习)

#### 当某个需要返回值的函数只执行一次时使用(即之后每次执行render时,该函数不再执行)

- 和useEffect区别,useEffect没有返回值
- 返回值优化
- 让计算操作不会多次执行

```react
import React, { memo, useState, useMemo } from 'react'

// caluNumTotal 只执行一次
function calcNumTotal(count) {
  console.log('calcNumTotal')
  let total = 0
  for (let i = 0; i < count; i++) {
    total += i
  }
  return total
}


export default memo(function APP() {
  const [count, setCount] = useState(0)
  const result = useMemo(() => {
    return calcNumTotal(count)
  },[count])
  return (
    <div>
      <h2>count: {count}</h2>
      <h2>result: {result}</h2>
      <button onClick={() => setCount(10)}>setCount(10)</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
})

```



- 传给子组件的是一个对象时,子组件会随着父组件render函数执行而多次执行

  ```react
  const HYInfo = memo(function HYInfo(props) {
    const {info} = props
    console.log("HYInfo render")
    return (
      <div>
        <h2>info: {info.name}</h2>
      </div>
    )
  })
    const info = {name: 'codecao', age: 23}
    //用法二: 传给子组件对象时,子组件不会多次渲染
    // const info = useMemo(() => {
    //   return {name: 'codecao', age: 23}
    // },[])
    
      return (
      <div>
        <h2>count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <HYInfo info={info} />
      </div>
    )
  })
  
  ```

  





# 六. useRef(特殊场景)

- useRef组件的整个生命周期中总是返回同一个对象

- 获取DOM

  ```
  import React, { memo, useRef } from 'react'
  export default memo(function APP() {
    const titleRef = useRef()
    const inputRef = useRef()
  
    function showTitleDOM() {
      console.log(titleRef)
      console.log(inputRef)
      console.log(titleRef.current)
      inputRef.current.focus()
    }
    return (
      <div>
        <h2 ref={titleRef}>Hello World</h2>
        <input ref={inputRef} type="text" />
        <button onClick={showTitleDOM}>查看showTitleDOM</button>
      </div>
    )
  })
  ```

  

- 保存某一个值

  - obj只是第一次不等于nameRef,第二或N次都等于

  - 且每次执行(memo会根据有无数据变化,来决定APP函数要不要再次执行)

    - `useRef` 在组件多次渲染间返回 **同一个对象**

      你把它赋值给了 `obj`（模块级变量），所以第二次对比时，它们就是同一个引用了


  ```
  import React, { memo, useState, useRef } from 'react'
  
  let obj = null
  export default memo(function APP() {
    const [count, setCount] = useState(0)
    const nameRef = useRef()
    console.log(obj === nameRef)
    obj = nameRef
    return (
      <div>
        <h2>count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    )
  })
  
  ```

  





# 七. useImperativeHandle(了解)

- 不希望父组件对子组件有完全的权限,而是子组件决定给父组件的权限

```
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'

// memo包含forwardRef,forwardRef作用是为了在hooks函数中,父组件能传递ref给子组件以来控制子组件
const HYDOM = memo(forwardRef((props, ref) => {
  const inputRef = useRef()
  
  useImperativeHandle(ref, () => {
    return {
    // 给父组件的权限
    // 权限一
      focus: () => {
        console.log('focus')
        inputRef.current.focus()
      },
  // 权限二
      setValue: (value) => {
        console.log('setValue')
        inputRef.current.value = value
      }
    }
  })
  return (
  
      <input type="text" ref={inputRef} />
  )
}))

export default memo(function APP() {
  const titleRef = useRef()
  
  // 1. 先绑定useRef
  const inputRef = useRef()

  function handleDOM() {
    console.log(titleRef.current)
    console.log(inputRef.current)
    
    //操作子组件的具体操作
    // 希望处理子组件的DOM的input的某些事件(如focus,setValue)
    inputRef.current.focus()
    inputRef.current.setValue("Hello World")
  }

  return (
    <div>
      <h2 ref={titleRef}>title</h2>
      
      //2. 传递给子组件的DOM(如子组件的input)
      <HYDOM ref={inputRef} />
      
      //3. 操作子组件的函数
      <button onClick={handleDOM}>DOM操作</button>
    </div>
  )
})

```







# 八. useLayoutEffect(很少)

- 组件渲染内容更新到界面之前回调(useLayoutEffect)
  - useEffect是渲染之后更新

- 当遇到useEffect解决不了,才会使用到useLayoutEffect
- 修改数字案例
  - useEffect,闪烁的现象 -- 先出现0再出现其他数字
  - useLayoutEffect, 不会出现闪烁的现象 --- 不会出现0,直接出现其他数字

```
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

export default memo(function APP() {
  const [count, setCount] = useState(100)

  // 无闪烁
  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect")
  //   if (count === 0) {
  //     setCount(Math.random() + 100)
  //   }
  // })

  // 有闪烁
  useEffect(() => {
    console.log("useEffect")
    if (count === 0) {
      setCount(Math.random() + 100)
    }
  })

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={() => setCount(0)}>count设置为0</button>
    </div>
  )
})

```







# 九. 自定义Hook(练习)

- 生命周期打印

  ```react
  import React, { memo, useEffect, useState } from 'react'
  
  // 提取useEffect
  function useCustomEffect(fn, deps) {
    useEffect(() => {
      console.log("组件挂载")
      return () => {
        console.log("组件卸载")
      }
    })
  }
  
  const Home = memo(function Home() {
    // useEffect(() => {
    //   console.log("组件挂载")
    //   return () => {
    //     console.log("组件卸载")
    //   }
    // })
  
    useCustomEffect()
    return <h2>Home</h2>
  })
  const About = memo(function About() {
    // useEffect(() => {
    //   console.log("组件挂载")
    //   return () => {
    //     console.log("组件卸载")
    //   }
    // })
  
    useCustomEffect()
    return <h2>About</h2>
  })
  
  export default memo(function APP() {
    useCustomEffect()
    const [isShow, setIsShow] = useState(true)
    return (
      <div>
        <h2>Custom Hooks</h2>
        <button onClick={() => setIsShow(!isShow)}>显示/隐藏</button>
        { isShow && <Home/>}
        { isShow && <About/>}
      </div>
    )
  })
  
  ```





- Context共享

```react
index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContext, TokenContext } from './09-customHooks/context'
import APP from './09-customHooks/APP'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContext.Provider value={{name: 'codecao', age: 18}}>
    <TokenContext.Provider value={{token: '1234567890'}}>
      <APP />
    </TokenContext.Provider>
  </UserContext.Provider>
)


------------------------------------
./09-customHooks/context
import { createContext } from "react";

const UserContext = createContext();
const TokenContext = createContext();

export { UserContext, TokenContext };

-------------------------------------------
./09-customHooks/hooks/useUserToken.js
import { useContext } from "react";
import { UserContext, TokenContext } from "../context";

function useUserToken() {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  return { user, token };
}
export default useUserToken;

--------------------------------------------------
./09-customHooks/hooks
import useUserToken from './useUserToken'
export { useUserToken }


----------------------------------------
./09-customHooks/APP.jsx
import React, { memo } from 'react'
import { useUserToken } from './hooks'
const Home = memo(function Home() {
  const { user, token } = useUserToken();
  return <h1>Home: {user.name} {token.token}</h1>
})

export default memo(function APP() {
  const { user, token } = useUserToken();
  return (
    <div>
      <h2>User: {user?.name}</h2>
      <h2>Token: {token?.token}</h2>
      <Home />
    </div>
  )
})


```



- 监听窗口的滚动

```react
./09-customHooks/hooks/userScrollPosition.js
import { useState, useEffect } from "react";
function useScrollPosition() {
  const [ scrollX, setScrollX ] = useState(0);
  const [ scrollY, setScrollY ] = useState(0);

  useEffect(() => {
    function handleScroll() {
      // console.log(window.scrollX, window.scrollY);
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return { scrollX, scrollY };
}

export default useScrollPosition;

-----------------------------------------------------------
./09-customHooks/hooks
import useUserToken from './useUserToken'
import useScrollPosition from './useScrollPosition'

export { useUserToken, useScrollPosition }


----------------------------------------------------
./09-customHooks/APP.jsx
import React, { memo, useEffect } from 'react'
import { useScrollPosition } from './hooks'
import './sytle.css'

const Home = memo(function Home() {
  const { scrollX, scrollY } = useScrollPosition();
  return <h1>Home Component: {scrollX} {scrollY}</h1>
})

export default memo(function APP() {
  return (
    <div className='app'>
      <h1>APP Root Component</h1>
      <Home />
    </div>
  )
})

```



- state和localStorage

  ```react
  ./09-customHooks/useLocalStorage.js
  import { useEffect, useState } from "react";
  function useLocalStorage(key) {
    // 1.从localStorage中获取数据,并且数据创建组件的state
    const [data, setData] = useState(() => {
      const item = localStorage.getItem(key);
      if (!item) return null;
  
      // 解析JSON字符串为对象
      return JSON.parse(item);
    });
  
    // 2.监听data的变化,将最新的数据存储到localStorage中
    useEffect(() => {
      //为什么要JSON.stringify(data)
      //因为localStorage只能存储字符串,不能存储对象
      localStorage.setItem(key, JSON.stringify(data));
    }, [data]);
  
    return [data, setData];
  
  }
  export default useLocalStorage;
  
  
  -------------------------------------------------
  ./09-customHooks/hooks
  import useUserToken from './useUserToken'
  import useScrollPosition from './useScrollPosition'
  import useLocalStorage from './useLocalStorage'
  export { useUserToken, useScrollPosition, useLocalStorage }
  
  -----------------------------------------------------
  ./09-customHooks/APP.jsx
  import React, { memo } from 'react'
  import { useLocalStorage } from './hooks'
  // import useLocalStorage from './hooks/useLocalStorage'
  
  export default memo(function APP() {
    const [token, setToken] = useLocalStorage('token');
    function setTokenHandler() {
      setToken('1234567890');
    }
  
    const [avatarUrl, setAvatarUrl] = useLocalStorage('avatarUrl');
    function setAvatarUrlHandler() {
      setAvatarUrl('https://codecao.com');
    }
  
    return (
      <div>
        <h1>token: {token}</h1>
        <button onClick={setTokenHandler}>设置token</button>
  
        <h1>avatarUrl: {avatarUrl}</h1>
        <button onClick={setAvatarUrlHandler}>设置avatarUrl</button>
      </div>
    )
  })
  
  ```

  

  

  