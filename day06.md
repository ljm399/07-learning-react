# 一. React中CSS使用方案

- 前端是组件的天下

  - 而CSS天生就不是为组件化而来,比如其名就叫层叠样式

- 适合组件化的CSS应满足效果

  - 有自己的作用域,不会污染其他组件的元素
  - 可以编写动态的css 如 { a?b:c}
  - 支持所有css的特性,便于学习
  - 编写简洁

- vue几乎可以满足需求

  - 如vue中可以添加scoped来决定是全局样式还是局部
  - 通过lang属性设置less,sass等预处理器
  - 而且官方规定了统一的样式风格,防止不同人员采用不同的样式风格

- 而React官方没有规定,即你可以用普通css,cssmodules或者css in js等几十种方案处理,但直到现在没有最好的统一的方案, css in js目前可以说最受欢迎

  



### 1.1. 方案一: 内联样式

```
this.state = {
	titleSize: 30
}
add() {
 this.setState({ titleSize:this.state.titleSize + 2 })
}
render() {
	const {titleSize} = this.state
	return (
		<div>
			<button onClick={ e => this.add()}增加 </
			<h2 style = {{color:"red", fontSize: `${titleSize}px`}}</
	)
}
```

- 优点
  - 样式之间不会冲突,<h2 style =...
  - 可以动态获取当前state中的状态
- 缺点
  - 1.写法要求驼峰
  - 没提示
  - 大量样式,混乱
  - 某些样式无法编写(比如伪类/伪元素)

所有官方希望以内联和普通css结合编写



### 1.2. 方案二: 普通的CSS

- 编写的css属于全局,故最大问题是样式之间会相互叠层掉
  - 团队之间,队友之间的代码更加容易有这问题





### 1.3. 方案三: CSS Module

- 需要配置webpack环境
  - 有对应的脚手架(里面有)
  - 或自己单独配置

- 解决了局部作用域问题,多人开发方便

- 问题

  - 引用类名,不能使用连接符(home-title),因为JavaScript不识别

  - 所有的className都必须使用(style.className)的样式编写

    - 如

      ```
      先引入 import 我是cssModule from './xx.modules.css'
      <div className={我是cssModule.h2} -- style.className
      ```

  - 文件名
    - xx.css 是全局
    - xx.module.css 才是局部

  - 不方便动态修改某些样式

- 但基本可以满足需求



### 1.4. 方案四: Less配置和使用



### 1.5. 方案五: CSS IN JS

React中: HTML + CSS = UI

​			JSX => HTML in JS

​			CSS => CSS in JS

##### 所以有人称React为 All in JS



##### 流行的相关库

- styled-components(主要,国内外都流行)

- emotion
- glamorous



##### 安装

```
yarn add styled-components
```



#####  需要的前提知识

```
标签模版字符串
//1. 模板字符串的基本使用
//const str = `my name is ${name}`

//2.标签模版字符串的使用
funciton foo(...args) {
	clg(args) 
}
foo('a','b')//普通调用 // 结果:// ["a","b"]

foo`my name is ${name},age is ${age}` //标签模板方式调用函数 //结果[Array(3), 'why', 18]

```



##### 需要安装的插件 -- 打入的代码有提示

- vscode-styled-components



##### 代码:styed.div ``

- 优点:方便向css中引入和修改变量 -- less/css不方便引入

```
导入
import styled from "styled-components"
import {
	primaryColor,
	secondColor,
	largeSize
} from "./style/variables" 
import {
	primaryColor,
	largeSize
} from ".variables" -- 5.从一个单独的文件中引入变量(最下面)

// 1. 基本使用
export const mainWrap = styled.div `
	.cao {
		css样式(secondWrap的样式被抽取到了下面)
		
		
	}
`
// 2. 子元素可以单独抽取到一个样式组件,看下面组件的代码
// 3. 可以接受外部传入的props
// 4. 可以通过attrs给标签模板字符串中提供的属性(默认属性)
// 5. 从一个单独的文件中引入变量(最下面,看左边导航栏有)
// 6. 样式继承(最下面,左边导航栏有)
export const secondWrap = styled.div.attrs(props => {
	clg('放入逻辑元素')
	return {
		tColor:props.color || "blue"
	}
})`
	.title {
		font-size: ${props => props.size}px; --接受传入的值,为什么不是${props},因为这只会在上下文找,而传入的函数再执行后会调用传入的props参数
		&: hove {
			bg:${primaryColor} -- 5. 从一个单独的文件中引入变量(最下面)
		}
	}
`
```



组件中

```
import { MainWrap, SecondWrap } from "./style"
this.state({
	size : 30
})

<AppWrapper>
	<SecondWrap size={size}>
		<h2>....
    </SecondWrap>
	<div>
		<p>...
    </div>
</AppWrapper>

```

##### 5. 从一个单独的文件中引入变量(最下面)

- variable.js

```
export const primaryColor = "#ff8822"
export const smallSize = "12px"
```



##### 6. 样式继承

```
const HYButton = styled.button`
	border: 1px soild red;
	border-redius: 5px
`
export const HYButtonWrapper = styled(HYButton)` -- HYButtonWrapper有HYButton的样式了
	color:#fff;
    bg:...
`
```



##### CSS in JS中CSS的值来源

- 自己定义如 : color: red

- 外部传入

  - <组件 color={color}>
  - color: ${props => props.color }

- context

  - ```
    import { thememProvider } from "styled=components"
    const root = ReactDOM.craeteRoot(document.getElementById("root"));
    root.render(
    	<ThemeProvider theme={{color:"purple", size:"50px"}}
    		<APP />
        </ThemeProvider>
    )
    ```

  - color: ${props => props.theme.color }

- 自己设一个专门放常量的文件

  - variable.js

  ```
  export const primaryColor = "#ff8822"
  export const smallSize = "12px"
  ```

  



### 1.6. 类库: classnames

##### npm install classnames

- 可以为我们在React快速添加class



##### 动态:可以点击按钮来判断class有还是无



##### vue中添加动态的class很简单

```
添加个对象
<div class="static"
	 v-bind:class="{active:isActive, "text-danger": hasError}"
 
添加一个数组
<div class="static"
	 v-bind:class="[activeClass, errorClass]"
	 
 甚至对象和数组一起
<div v-bind:class="[{active:isActive}, errorClass]"
```



##### 在React不用classnames

```
const {isb, isc} = this.state
const classList = ['a']
if(isb) classList.push("b")
if(isc) classList.push("c")
//classnames的原理
const classname = classList.join('')

return (
	<h2 class{`a ${isb ? "b":''} ${isc ? 'c':''`}><h2>
    <h2 class{classnames><h2>
)
```

##### 使用classnames

```
import classNames from "classnames"

添加对象
<h2 className={classNames('a', {b:isb, c:isc })}
添加数组
<h2 className={classNames(['a', {b:isb, c:isc }])}
```





# 二. React中Redux的使用

##### 纯函数概念

- 确定的输入一定产生确定的输出

  - ```
    function add(num) {
    	return num + 10
    }
    add(1) // 11
    要是外面有个值使得 add(1) //101 则不是确定的值得到确定的输出
    ```

  - 不参数副作用

    - 执行过程中不会修改全局或其他作用域的数据

##### React的所有组件虽然非常严格,但有个严格的规则

- 所有React组件都必须想纯函数一样保护他们的props不被修改



### 2.1. redux的核心概念介绍

- 为什么需要redux
  - 因为现在要管理的状态非常复制与多
  - React在视图层帮助我们解决了DOM的渲染过程,但是State如何维护留给我们自己来管理
    - UI = render(state)
  - Redux就是个管理State的容器:Redux是JS的状态容器,提供了可预测的状态管理



- store 存储 state

  

- action => 修改state

  - 所有数据变化必须通过派发(dispatch) Action来更新

  - action是个普通的JS对象,描述更新的type和content

    - ```
      const action = { type: "CHANGE_NAME", playload: { index: 0, newName: 'codecao'}}
      ```


  - 强制使用action的好处
    - 可以清楚的知道数据发生了什么变化,所有数据变化都是可追踪,可预测的



- reducer => 纯函数\
  - renducer作用就是将传入的state和action结合起来生成一个新的state






### 2.2. redux使用过程演练

##### 创建项目: 

- npm init -y / yarn init -y
- npm install redux / yarn install redux



​	

#### 2.2.1. 创建store的过程和reducer的使用

- createStore和定义reducer函数

  - ```
    index.js中
    const {createStore} = require("redux")
    
    const initialState = {
    	name: 'why',
    	counter: 100
    }
    
    定义reducer纯函数
    //两个参数:
    //参数一: store中目前保存的state
    //参数二: 本次需要更新的action(dispatch传入的action)
    //返回值:他的返回值会作为store之后存储的state
    
    function reducer(state=initialState, action) { -- 默认值initialState,只在第一次调用
    	if (action.type = "change_name") {
    		return { ...state, name: action.name} } // 不可以先state.name= xx 再return state,这样对外界参数影响产生副作用就不是纯函数了,
    		//return { ...state, name: action.name} 是先创建了一个对象,再解构state,然后放入name属性,name属性由于是后面添加会覆盖state的name属性的值
        
        else(action.type = "change_number") {
        	return {...state, counter: action.num}
        }
    		
        return state//没有数据更新,就返回之前的state
    	}
    }
    
    const store = createStore(reducer)
    module.exports = store
    ```

    

  



#### 2.2.2. dispatch派发action

- 只要你调用了store.dispatch(),则index.js的reducer就会被调用

```
其他组件中使用state
const store = require("./store") -- 先引入创建了store和reducer的那个文件,这里省略了index.js

clg(store.getState()) //获取里面的值

//修改store中数据,必须是action
const nameAction = { type:"change_name", name: 'kobe'}
store.dispatch(nameAction) // 把action传给了index.js的reducer纯函数的第二个参数action中
clg(store.getState()) //获取

//再次修改,Number
const nameAction = { type:"change_number", num: 30} //type和name自定义,但见文知意
store.dispatch(nameAction) 
clg(store.getState()) //获取
```





#### 2.2.3. subscribe订阅state

- 之前问题:每次调用都需要clg(store.getState()) //获取

- 优化

  ```
  const store - require("./store")
  const unsubscribe = store.subscribe(() => {
  	clg("订阅的数据变化", store.getState())
  }) -- 订阅后会放回一个取消订阅的函数,用unsubscribe存储
  store.dispatch({type:'change_name', name:"kobe"})
  store.dispatch({type:'change_name', num: 20})
  
  unsubcibe() // 取消订阅
  store.dispatch({type:'change_name', num: 20})//因为取消订阅,所以这个不会有值打印
  ```

  





#### 2.2.4. 代码的优化过程

- action的创建放到一个函数中,并且抽取到actionCreators.js文件中

  - ```
    actionCreators.js
    const changeNameAction = (name) => ({
    	type: 'change_name'
    	name
    })
    const addNumberAction = (num) => ({
    	type: 'change_number'
    	num
    })
    module.exports = {
    	changeNameAction,
    	addNumberAction
    }
    ```

  - 组件代码

    ```
    const { addNumberAction, changeNameAction } = require("./store/actionCreators")
    const unsubscribe = store.subscribe(() => {...})
    store.dispatch(changeNameAction("kobe"))
    store.dispatch(addNumberAction(50))





- 所有的字符串常量放到constants.js文件

  - ```
    constants.js
    const ADD_NUMBER = 'add_number'
    const CHANGE_NAME = 'change_name'
    module.exports = {
    	ADD_NUMBER,
    	CHANGE_NAME
    }
    ```
  - index.js , 且优化ifelse为 Switch

    ```
    const { ADD_NUMBER, CHANGE_NAME } = require("./constants")
    const initialState = {...}
    
    function reducer(state=initialState, action) { 
    	switch(action.type) {
    		case CHANGE_NAME:
    			return {...state, name: action.name}
            case ADD_NUMBER:
            	return {...state, counter:state.counter+action.num}
            default:
            	return state // 没有数据更新,就返回之前的state
    	}
    }
    moduel.exports = reducer
    ```

    

- reducer函数和初始化值,也放到reducer.js文件

  ```
  reducer.js
  const { ADD_NUMBER, CHANGE_NAME } = require("./constants")
  const initialState = {...}
  
  function reducer(state=initialState, action) { 
  	switch(action.type) {
  		case CHANGE_NAME:
  			return {...state, name: action.name}
          case ADD_NUMBER:
          	return {...state, counter:state.counter+action.num}
          default:
          	return state // 没有数据更新,就返回之前的state
  	}
  }
  moduel.exports = reducer
  ```

  

- index.js中创建store和导出store

  ```
  index.js
  cosnt { createStore } = require("redux")
  const reducer = require("./reducer.js")
  //创建store
  const store = createStore(reducer)
  module.exports = store
  ```



### 2.3.redux的三大原则

1. 单一数据源
   - 整个应用程序的state被存储在一颗object tree中,这颗只存储一个store
   - Redux没有强制说不能创建多个Store,但那样不利于数据的维护

2. State是只读
   - 唯一修改的方法只能是dispatch action
     - 这样保证所有的修改都集中化处理,
     - 并且安装严格的顺序来执行,所以不需要担心rece condition(竞态)的问题
       - 竞态: 两个线程处理一个事件导致bug
3.  使用纯函数来修改



### 2.4.redux的使用过程

1. 创建一个对象,作为初始值state
2. 创建个Store来存储这个state
   - 创建store时必须创建reducer

3. 通过action修改state
   - dispatch来派发action
   - action都有type属性,也可以携带其他数据
4. 通过reducer处理旧state和action.来放回一个新的state



### 额外知识: node中对ES6模块化的支持

##### 需要再package.json中添加属性: "type": 'module'

##### 且导入文件时,需要带上js后缀名



### 2.4.redux在react使用:计时器 -- 案例练习

- 创建项目
  - create-react-app "文件名"

- 创建redux对应的store文件夹
  - 四个文件
    - actionCreators.js
      - 记得要引入到具体组件中和reducer.js中
    - constants.js
    - index.js
    - reducer.js
  
- 组件中使用
  
  - 方法一:要使用生命周期函数聪明派DidMount
  
  - ```
    export class About extends PureComponent {
      constructor() {
        super()
        this.state = {
          counter: store.getState().counter
        }
      }
      componentDidMount() {
        store.subscribe(() => {
          const state = store.getState()
          this.setState({counter: state.counter})
        })
      }
     
    
    ```
  
    
  
  - 组件中修改
  
    - store.dispatch(addNumberAction(num)
  
  
    ```
     increment(num) {
        store.dispatch(incrementAction(num))
      }
    ```
  
  
  - 加的组件直接把数据传给Redux处理
  






- 方法二:减的组件先把数据传给父组件(App.js),再让父组件来把数据传给Redux

  - 减的相关代码

  ```
  App.js
   <Home counter={counter} decrement={this.decrement}/> 
   
   decrement = (num) => {
      store.dispatch(decrementAction(num))
    }
  ```

  ```
  减.js
   constructor(props) {
      super(props)
      this.state = {
        counter: props.counter
      }
    }
    decrement(num) {
      this.props.decrement(num)
    }
    render() {
      const {counter} = this.props
      return (
        <div>
          <h1>Home Counter: {counter}</h1>
          <button onClick={() => this.decrement(4)}>-4</button> 
          <button onClick={() => this.decrement(20)}>-20</button>
        </div>
      )
    }
  ```

  



