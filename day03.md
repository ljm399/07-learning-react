# 一. 组件化开发

### 1.1. 组件化开发概念

- 组件化开发分而治之的思想
- React组件化的划分
  - 类组件和函数组件
  - 有状态组件和无状态组件
  - 展示型组件组件和容器型组件



### 1.2. 类组件和函数组件





### 1.3. 组件的生命周期(重要)

- constructor
- render
- componentDidMount

  - 发送网络请求
  - 先下载axios
  - ```
    axios.get("url").then(res=>{
    	const banner = res.xx.xx
    	this.setState({
    		banners
    	})
    })
    ```
  - 

- componentDidUpdate
- componentWillUnmount



### 1.4. 组件的嵌套关系





### 1.5. 组件父子的通信

#### 1.5.1. 父传子 props





#### 1.5.2. 子传父props => 函数

- 回调函数



#### 1.5.3. 类型验证propTypes/默认值defaultProps





### 1.6. 父子通信的案例练习





### 1.7. React插槽效果实现--React没有slot

#### 1.7.1. 方案一: children方案

```
父组件:
	<navbar>
		<button>按钮</button>
		<i>文字</i>
	</navbar>
	
	
子组件:navbar
	const { children } = this.props
	<div>{children[0]}...
	<div>{children[1]}...
	
```

- 缺点

  1. 要记住数组索引

  2. 要是只有一个组件如没有i只有button, 则children直接是button而不是数组

     那么children[0]是undefined

     - 解决: Navbar.propTypes = {children:PropTypes.array}



#### 1.7.2. 方案二:props属性

```
父:
const btn = <button>按钮></button>
 <navbar
 	leftslot={btn}
 	rightslog={<i>文字</i>}
 />
 
 
 子:
 const {leftslot, rightslot} = this.props
 <div>{leftslot}</div>
 <div>{rightslot}</div>
```







#### 1.7.3. 作用域插槽

- 作用
  - 标签有父元素决定
  - 具体数据有子元素传递给父元素



```
父:
	gitTabItem(item) {
		if(item=="流行"){
			return <span>{item}</span>
		}else if(item==='新款') {
			return <span>{item}<span>
		}
	}
	<navbar
		//方式一:itme固定
		//itemType={itme=><button>itme</button}
		
		//方式二:item自由
		itemType={item => this.getTabItem(item)}
	/>	
		
子:

	<div>{itemType{item}}</div>
				
	
```







### 1.8. Context的使用

- 非父子之间传递数据,Context定义的数据在全局作用域里面



#### 1.8.1. spread props/attributes

- 一层层传递

- ```
  <Home {...info}/> 组件名开头要大写
  子: <Som {...info} />
  孙:<Grandson {...info} />   ...info拆解为name={info.name} age={info.age}
  子孙 就可以拿到info的数据 
  ```

  



#### 1.8.2. Context基本使用

- 1.创建Context

  - ```
    xx.js
    import React from 'react'
    const ThemeContext = React.createContext()
    export default ThemeContext
    ```

    

- 2.Context.Provider提供value

  - ```
    在具体xx.jsx导入上面的xx.js
    <ThemeContext.Provider Value={{color:"red",size:'30'}}
    </ThemeContext.Provider>
    ```

  - 

- 3.类组件ContextType = Context(订阅)

  - ```
    在其他组件如HomeInfo中导入
    import ThemeContext from './Context/xx.js'
    HomeInfo.ContextType = ThemeContext(订阅)
    ```

    

- 4.类组件this.context

  - ```
    HomeInfo:
    <div>{this.context.color}</div>
    ```

    






#### 1.8.3. Context额外补充

1. 在函数式组件中使用Context,函数组件中不能用this.context
   - Context.Consumer
     - value => {}
     
     ```
     <ThemeContext.Consumer>
     	{
     		value => {
     			return <h2>{value.color}</h2>
     		}
     	}
     <ThemeContext.Consumer>
     ```
     
     
   
2. 多个Context共享数据(context.Consumer)
   - 类组件用Context.Consumer
   
   - ```
     多个Context.Provider
     <UserContext.Provider value ={{.....}}>
     	<ThemeContext.Provider value={{....}}
     	</
     	</
     ```
   
     
   
3. defaultValue
   - 如果使用Context,该组件不是Context.Provider的后代组件
   
     - ```
       多个Context.Provider
       <UserContext.Provider value ={{.....}}>
       	<ThemeContext.Provider value={{....}}
       	</
       	</
       不在<UserContext.Provider....></...>里面
       如在这里<Home {...info}/> 则在home组件里面info没有数据
       ```
     - 
   - 那么使用的defaultValue值
   
     - ````
       xx.js
       import React from 'react'
       const ThemeContext = React.createContext({color:'red',size:"30"})
       export default ThemeContext
       ````
   
     - 











