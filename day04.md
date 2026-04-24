# 一.EventBus

- hy-event-bus

- 步骤

  - npm install event-bus

  - xx.js不是jsx,放在一个文件中,那其他文件引用方便,而不是每个文件都写一次

    - ```jsx
      import {HYEventBus} from "hy-event-store"
      const eventBus = new HYEventBus()
      export default eventBus
      ```

  - 使用的组件

    - ```jsx
      import eventBus from "./xx.js"
      ```

    - ```jsx
      都是在在类中 
      import React, { Component } from "react"
      export class Home extends Component {	
      }
      ```
      
    - 主组件:在类中的生命周期中
    
      ```jsx
      //生命周期:挂载是回调
      ComponentDidMount() {
      	//第三个参数可以帮你this
      	eventBus.on("bannerPrev", this.bannerPreClick, this)
      }
      
      bannerPreCLick(a, b, c) {
      	console.log(a,b,c)
      }
      
      //生命周期:切走时回调 -- 这里用来把eventBus里面的bannerPrevClick取消掉(或删除)
      ComponentWillUnmount() {
      	eventBus.off("bannerPrev", this.bannerPrevClick)
      }
      ```
    
    - 其他要传递数据到主组件的组件
    
      - ```jsx
        也是和主组件中在类中,但不用再生命周期函数中,因为让你来控制这个函数什么时候传递数据给主组件
        export class Home extends Component {	
        	preClick() {
        		eventBus.emit("bannerPrev", "why", 18, 1.88)
        	}
        }
        ```





# 二.setState的细节原理

- 修改了state后,希望React根据最新的State来重新渲染界面,但React不会像vue2的Object.defineProperty或者vue3的Proxy的方式对数据监听

- 我们必须使用setState来告诉React数据已经发生了变化

- 总结:React没有像vue2/vue3一样对数据劫持,而是全交给制造者处理,自由度更高

- 组件中没有实现setState的方法,但可以调用

  - 因为setState是从Component中继承过来的

    ```
    Component.prototype.setState = function(xx, xx) {
    	...
    }
    ```

    

### 2.1.setState的其他用法

- setState({})  - 基本使用

  - ```
    this.setState({
    	message: '你好'
    })
    ```

    

- setState((state,props)=>{return {}}) - 第一个参数用函数

  - 作用:可以编写新的state/props逻辑,而且用state/props不用再this.state/props

  - ```
    this.setState((state, props) => {
    	1.编写新的state/props逻辑
    	return {
    		message : '你好' - 返回新的
    	}
    })
    ```

  - 

- setState(updater,callback) - 两个参数

  - setState是个异步调用

  - 所以 

    ```
    this.setState({message:"你好"})
    clg(this.state.message) // 不是"你好"还是原来值
    ```

  - 解决

    - ```
      this.setState({message:"你好"}, ()=> {
      	clg(this.state.message)// "你好"
      })
      ```





### 2.2. setState是异步(批量更新)

- 本次更新会加入队列中queue
- 两个优势:
  1. 多个updater放在同一个更新中,执行一次render函数,提高性能
  
     而不是setState没更新一次则render函数就调用一次
  2. 保证在state没有被更新的时候,state/props保持一致
  
     而不会调用到render函数时,里面的state和props不一致



### 2.3.setState一定是异步吗

- 在React18之前
  - setTimeout/Promise.then回调/原生DOM事件回调中是同步的
    - 因为交给浏览器处理 而不是node编译
- 在React18开始
  - setTimeout/Promise.then回调/原生DOM事件回调中这些操作也变成批量处理(异步处理)
  - 要是18后向同步则
    - import { flushSync } from "react-dom"
    - flushSync(()=>{})



### 2.4 React更新机制

- React的渲染流程
  - JSX -> 虚拟DOM -> 真实DOM
- React的更新流程
  - props/state改变 -> render函数重新执行 -> 产生新的DOM树 -> 新旧DOM树进行diff -> 计算出差异进行更新 -> 更新到真实的DOM
  - 新旧DOM树进行diff的算法改进
    - 原来旧树的每片叶子都与新树每一片比较叶子比较
      - 算法 O(n<sup>2</sup>) ,性能低
    - 改进
      - 同层叶子比较,不会跨层次
      - 同层次自己可以给每个叶子设key,来指定那些叶子保持稳定,不用比较和更换





# 三.SCU的性能优化

### 3.1. 默认Component组件

- SCU即shouldComponentUpdate -- 一种生命周期方法
  - 两个参数
    - nextProps
    
    - nextState
    
    - nextContext(一般用不到)
    
      - 当全局Context里面的数据改变,你可以根据这个判断要不要调用render
    
        ```jsx
        class MyComponent extends React.Component {
          shouldComponentUpdate(nextProps, nextState, nextContext) {
            console.log('当前 context:', this.context);
            console.log('下一个 context:', nextContext);
            return this.context !== nextContext;
          }
        ```
    
        
    
  - 返回值
    - 默认是ture
    - true则调用render
  
- 没有实现shouldComponentUpdate方法,只要是调用setState,那么render一定会被执行

- 自己实现shouldComponentUpdate优化操作
  - 判断props/state是否有发生变化
  
  - 在子组件中和主组件都可以有SCU
  
    - ```jsx
      construct(props) {
      	super(props)
      	
      	this.state = {
      		friends : []
      	}
      }
      
      shouldComponentUpdate(nextProps, nextState) {
      	if	(this.props.message !== newProps.message ) {
      		return true
      	}
      	return false
      }
      
      changeMessage() {
      	this.setState({message:'其他'}) //当调用这个就会调用SCU,这里的message是nextState
      }
      ```
  
      



### 3.2.PureComponent/memo

因为上面的SCU调用太麻烦,所以有了这两个(React帮我们实现了)

- PureComponent: 类组件

  - 实现

    ```
    把本来import React,{ Component } from "react" 
    改为 import React,{ PureComponent } from "react" 
    
    然后export class App extends Component {}
    改为export class App extends PureComponent {}
    ```

  - 则就有了上面SCU的效果

  

- memo: 函数组件

  - 因为函数组件没有生命周期函数,SCU是一种生命周期方法

    - 比如 

      ```
      一个 xx.jsx是
      function Profile(props) {
      	return <h2>Profile: {props.message}</h2>
      }
      export default Profile
      ```

      里面没有生命周期函数,类中才有

    - 这时用memo

      - 实现

        ```
        import { memo } from "react"
        const Profile = memo(function Profile(props) {
        	return <h2>Profile: {props.message}</h2>
        })
        export default Profile
        ```

        




### 3.3. PureComponent原理/源码(了解)

- shallowEqual - 浅拷贝



### 3.4. state的不可变力量 - 即state里面数据(book里面的数据) 

- 修改state中的某一个数据(引用类型)
  - 先对数据进行拷贝操作
  - 修改拷贝之后对象,设置新对象
  - ```jsx
    const newbook = {name: "Angular高级设计", price: 88}
    1.直接修改原有的state,重新设置一遍
    this.state.books.push(newbook)
    this.setState({books: this.state.books})
    错误,在PureComponent不会渲染,因为新的state和旧的state是一样的,所有不会更更新
    
    解决:对数据拷贝赋值给新的对象,旧新对象虽然引用内容一样,但浅表不一样,PureComponent是浅拷贝
    const book = [...this.state.books]
    books.push(newbook)
    
    ```
  
  



# 四.ref获取DOM和组件

### 4.1.ref获取DOM

```jsx
export class App extends PureComponent {
	render() {
		return (
			<div>
				<h2>获取我</h2>
				<h2 ref="cao">获取我-方式一</h2>
				<h2 ref={this.titleRef}>获取二-方式二</h2>
			</div>
			)
	}
}
```



- 不推荐方式

  - ```jsx
    getDom() {
    	const h2El = document.querySelector()
    }
    ```

  - 浏览器处理,而多个组件获取的h2,你不知道是那个组件的h2

- 三种方式

  1. 直接在React元素上绑定一个ref字符串

     ```jsx
     clg(this.refs.cao) ----已废弃
     ```

  2. 方式二:提前创建好ref对象,createRef(),将创建出来的对象绑定到元素

     ```jsx
     引入createRef import React,{ PureComponent, createRef } from "react"
     
     在类中的构造函数中 
     construct() {
     	this.titleRef = createRef()
     }
     getDom() {
     	clg(this.titleRef.current)
     }
     <h2 ref={this.titleRef}>获取二-方式二</h2>
     ```

  3. 方式三

     ```jsx
     在类中的构造函数中 
     construct() {
     	this.titleEl = null
     }
     getDom() {
     	clg(this.titleEL)
     }
     <h2 ref={el => {this.titleEl = el}}>获取三-方式三</h2>
     ```

     





### 4.2. ref获取组件

- 类组件的实例(如text)

  - ```jsx
    引入createRef import React,{ PureComponent, createRef } from "react"
    class 其他组件 extends PureComponent {
    	text() {
    		clg("text----")
    	}
    	render() {
    		return <h1>hello</h1>
    	}
    }
    
    
    在类中的构造函数中 
    class App extends PureComponent {
    	construct() {
    	this.其他组件Ref = createRef()
    }
    	...
    	getComponent() {
    	clg(this.其他组件Ref.current)
    	this.其他组件ref.current.text() //执行了text
    }
    	...
    	<其他组件 ref = {this.其他组件Ref}></其他组件>
    }
    
    ```

  

- 函数组件,上面方式获取不了,因为函数式组件没有实例,所以获取不到对应的组件对象
  - forwardRef=>ref=>内部绑定ref

    - ```
      引入forwardRef 
      import React,{ PureComponent, createRef, forwardRef } from "react"
      
      类组件 class 其他组件 extends PureComponent {
      	text() {
      		clg("text----")
      	}
      	render() {
      		return <h1>hello</h1>
      	}
      }
      
      函数式组件
      function(props, ref) {
      	render() {
      		return <h1 ref={ref}>获取我函数式组件></h1>
      	}
      }
      
      获取函数式组件
      const 函数式组件 = forwardRef(function(props, ref) {
      	render() {
      		return <h1 ref={ref}>获取我函数式组件></h1>
      	}
      }) 然后和类组件一样的获取就行
      
      
      ```

      



# 五.受控和非受控组件

- 关于 text,textarea

- 当上面两个标签有了value属性,那其立刻变为受控组件,里面的内容不是有键盘输入了

  ```
  受控组件,因为有value
  <input type="text" value={username}></input>
  要是非要改变value里面的值(username)
  <input type="text" value={username} onChange{e => this.inputChange(e)}></input>
  inputChange(event) {
  	this.setState({ username: event.target.value})
  }
  
  
  非受控组件
  <input type="text" ></input>
  ```

  

