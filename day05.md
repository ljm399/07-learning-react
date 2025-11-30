# 一.受控和非受控组件

### 1.1. form提交的事件劫持

即使交给React控制-- 实现步骤

1. 在construct里面的state设置变量

2. 将变量绑定到form里面标签的value值中

   如 <input value=变量> </input

 







### 1.2. 两个input的事件合并一个函数

```
return (
	<div>
		<form onSubmit={e => this.handleSubmit(e)}}>
			{/*用户名和密码*/}
			<lable htmlFor="username">
			用户
			<input
				id="username"
				type="text"
				name="username"
				value={username} -- 一旦设置了value且其用了{}则是受控组件,键盘无法直接改动,解决办法如下及onChanage
				onChange={e=>this.handleIputChange(e)} -- 通过onChange属性可以通过this.setState来对React控制的值修改,从而调用render函数,实现value值改变
				
				密码
			<input
				id="Password"
				type="text"
				name="Password"
				value={Password} -- 一旦设置了value且其用了{}则是受控组件,键盘无法直接改动,解决办法如下
				onChange={e=>this.handleIputChange(e)}
)
```



onchange调用的函数合并

```
原本
handleUsername(event) {this.setState({username:event.target.value})}
handlePasswordname(event) {this.setState({password:event.target.value})}

合并:因为就属性名不同
方式一:计算属性
handleAll(event) {
	this.setState({
		[password/username]:event.target.value
	})
}

方式二:event里面有name的属性 -- 查文档知道
handleAll(event) {
	const keyName = event.target.name
	this.setState({
		[keyName]:event.target.value ---- 加[]让其知道keyName不只是个标识符
	})
}
```





### 1.3. checkbox的单选和多选绑定

单选

```
handleOneCheckbox(e) {
	this.setState({ isAgree: event.target.value})
}

form标签里面
<label htmlFor="agree">
	<input  id="agreee"
    	    type="checkbox"
            checked={isAgree} --- 不是通过value,而是checked
            onChange={e=>this.handleOneCheckbox(e)}
            /> 同意协议
	</..
	
	
```



多选 -- 多个选项都是会放在一个数组里面,作为如hobbies的值提交

```
handleCheckbox(event, index) {
	const hobbies = [...this.state.hobbies]
	hobbies[index].isChecked = event.target.checked
	this.setState({ hobbies })
}

{
	hobbies.map((item,index) => {
		return (
			<label htmlFor="agree">
				<input  id="agreee"
    	    			type="checkbox"
            			checked={isAgree} --- 不是通过value,而是checked
            			onChange={e=>this.handleCheckbox(e, index)}
            /> {item.text}
	</..
			)
	})
}


提交<form onSubmit={e => this.handleSubmit(e)}}> 
	这里面有 <button type = 'sumbit'>注册</button>
</form>
来获取hobbies的值
constructor {
	this.state = {
		hobbies: [
			{value: 'sing', text: '唱' isChecked: false}
            {value: 'dance', text: '跳' isChecked: false},
            {value: 'rap', text: 'rap' isChecked: false},            
		]
	}
}

handleSumbit(event) {
	const hobbies = this.state.hobbies.filter(item=> item.isChecked).map(item=>item.value)
	clg("获取爱好数组", hobbies)
}

```







### 1.4.select的单选和多选绑定

```
<select value={fruit} onChange={e=>this.handleFruit(e)} multiple>
	<option value='apple'>苹果
	<option value='orange'>橘子
	<option value='banana'>香蕉
	
	
	
handleFruit(event) {
	const options = Array.from(event.target.selectedOptions)
	cosnt values = options.map(item => item.value)
	this.setState({ fruit: values})
	
	以上代码改进
	Array.from()里面传入可迭代对象,event.target.selectedOptions是类数组,不是数组
	const values = Array.from(event.target.selectedOptions, item=>item.value)
	clg(values)
	
}
```

学习方法: 去stand shadow里面查,不用记



### 1.5. 非受控组件的使用

- ref绑定input

  ```
  先引入creatRef
  在construct中 this.测试ref = createRef()
  conmpontDidMount() { 声明周期函数
  	this.introRef.current.addEventListenner --必须要用到原生,所以尽量不要使用非受控组件,因为其本质就是操作原生
  }
  <input type="text" defaultValue={state里面的数据} ref={this.测试ref}
  ```

  

- this.inputRef.current.value

  ```
  在提交后获取 clg('获取',this.introRef.current.value)
  ```

  

- defaultValue默认值

```
<input type="text" defaultValue={state里面的数据} ref={this.测试ref}
```





# 二.高阶组件 - 现在有hook可以取代

高阶函数(满足以下其中一个条件就行)

- 传入一个函数的参数的是函数

- 或者返回的是参数

如[].map,fliter,reduce都是高阶函数

### 2.1. 高阶组件的定义 - HOC(Higher-Order Components)

- 是个函数
- 特定:
  - 接受一个组件作为参数
  - 并且返回一个新的组件
- 本质:
  - 对传入的组件进行劫持

- 在第三方库里面常见

```
定义一个高阶组件
function hoc(Cpn) {
	//定义类组件
	class NewCpn extends PureComponent {
		render() {
		 	return <Cpn name="why"/>
		}
		return NewCpn
	}
	
	//定义函数组件
	function newCpn(props) {
	
	}
	return NewCpn2
}
```





### 2.2. 应用一: 增强props

- userinfo

  ```
  在单独的js文件中,因为高阶组件是个函数
  function enhanceUserInfo(originComponent) {
  	class NewCpn extends PureComponent { 
  		constructor() {
  			super()
  			this.state = {
  				userInfo: {
  					name: 'cao',
  					age: '23'
  				}
  			}
  		}
  		render() {
  			return <OriginComponent {this.props} {...this.stete.userInfo}/}
  			--- this.props是["曹","俊豪"]
  		}
  	}
  	return NewCpn
  }
  
  export default enhanceUserInfo
  
  把该js文件引入到主组件中
  import enhanceUserInfo from "xx.js"
  
  原本
  function Cpn1(props) {
  	return <h1>Cpn1</h1>.....
  }
  function Cpn2(props) {
  	return <h1>Cpn1</h1>.....
  }
  function Cpn3(props) {
  	return <h1>Cpn1</h1>.....
  }
  改进
  const Cpn1 = enhanceUserInfo(function(props) {
  	return <h1>HOme:{props.name}-{props.age}</h1>
  })
  const Cpn2 = enhanceUserInfo(function(props) {
  	return <h1>HOme:{props.name}-{props.age}</h1>
  })
  const Cpn3 = enhanceUserInfo(function(props) {
  	return <h1>HOme:{props.name}-{props.age}</h1>
  })
  
  
  export class App extends PureComponent {
  	render() {
  		return (
  			<div>
  				<Cpn1 {['曹',"俊豪]}"/>
  				<Cpn2/>
  				<Cpn3/>
  		)
  	}
  }
  ```





- ThemeContext--用于设置好全局的主题颜色和尺寸

  - ```
    使用context前先创建个文件来存储有关context的代码,方便调用,因为context里面存储全局变量
    inport { createContext } from "react"
    const themeContext = createContext()
    export default themeContext
    ```

  - withTheme()

  ```
  import ThemeContext from ".."
  
  //主组件中不变
  export class App extends PureComponent {
  	render() {
  		return (
  			<div>
  				<ThemeContext.Provider value={{color:'red', size:30}}
  		) 
  	}
  }
  
  原本
  其他组件引入value值
  一样先导入ThemeContext
  export class App extends PureComponent {
  	render() {
  		return (
  			<div>
  				<ThemeContext.Consumer>
  					{
  						value => {
  							return <h2>theme:{value.color}-{value.size}</h2>
  						}
  					}
  				</....
  		) 
  	}
  }
  
  要是多个组件同时引入则上面的步骤太多,很麻烦
  用高阶组件改进
  在with_theme.js
  先引入ThemeContext
  function withTheme(orignComponent) {
  	return (props) => { -- 这里是返回一个箭头函数,如同return function(xx) {}
  		return (
  			<ThemeContext.Consumer>
  			{
  				value => {
  					return <originComponent {...value} {...props}/>
  				}
  			}
  		)
  	}
  }
  export default withTheme
  
  其他组件导入
  export class Product extends PureComponent {
  	render() {
  		const {color, size} = this.props
  		return (
  			<div>
  				<h2>{color}-{size}
  		) 
  	}
  }
  export default withTheme(Product)
  
  
  
  ```





### 2.3. 应用二: 登录鉴权

```
自己创一个文件,放逻辑代码
function loginAuth(OriginComponent) {
	return props => {
		const token = localStorage.getItem("token")
		
		if(token) {
			return <OriginComponent {...props} />
		} else {
			return <div>请先登录,再跳转</div>
		}
		
	}
}
export default loginAuth

其他组件
loginClick() {
	localStorage.setItem('token',"codecao")
	因为不是改变setState,所以render不重新调用则还是原来样子,forceUPdate强制让render调用
	方法一: this.forceUpdate() 
	方法二: this.setState({isLogin:true}) -- 使用setState
}

render() {
	return (
		<div>
        APP
        <button onClick={e=>this.loginClick()}登录</..
        <其他组件/>
	)
}
```





### 2.4.应用三: 生命周期

组件里面有个属性是name,可以获取组件名

```
封装在一个组件中
import { PureComponent } from 'react'
function 计算一个页面时间(OriginComponent) {
	return class extend PureComponent { -- 这里类的名可以省略,理解为匿名类
		UNSAFE_componentWillMount() {
			this.beginTime = new Date().getTime()
		}
		
		componentDidMount() {
			this.endTime = new Date().getTime()
			const intevVal = this.endTime - this.beginTime
			clg(`当前${OriginComponet.name}页面花费了${interval}ms渲染完成!`)
		}
		
		render() {
			return <OriginComponent {...origin}/>
		}
	}
}

export default logRenderTime
```





### 2.5. 高阶组件的意义

- 代码复用/组件复用方法的发展史:
  - mixins -- 之前,现在少用
  
    - Mixin可能会相互依赖,不利于维护,且方法之间可能有冲突
    - 少用
    - 进化为HOC
  - HOC -- 高阶组件 
  
    - 多次使用会参数非常多的嵌套,同时HOC可以劫持props,即不遵守约定,也可能会发生冲突
    - 进化为Hooks
  - HOOKs -解决了HOC的许多问题
  
    - 解决很多React问题之前存在的问题,比如this指向问题以及hoc的嵌套复杂度问题
  
      
  
- 两个高阶组件 
  - memo
  
  - forwardRef
  
    - 获取函数式组件中的DOM,因为函数式组件没有实例,就无法拿到组件对象
  
    - forwardRef
  
      ```
      const Home = forwardRef(function(props, ref) {
      	return (
      		<div>
      			<h2 ref={ref}>Home</h2>
      		)
      })
      ```
  
      
  
    





# 三.额外知识补充

### 2.1. Portals

- 当我们希望渲染的内容独立于父组件,甚至独立于之前挂载的DOM元素中(默认是id为root的DOM元素上)

```
现在public文件夹的index.html中
<div id="root"></div>
添加
<div id="why"></div>

在任意个组件中
导入createPortal
import { creatPortal } from "react-dom"
export class Modal extends PureComponent {
	render() {
		return createPortal(<h1>你好</h1>, document.querySelector("#why"))
		改进,则父组件可以把渲染的内容传递进来,达到代码复用
		return createPortal(this.props.children, document.querySelector("#why"))		
	}
}
export default Modal
```



### 2.2. Fragment

以为render都需要个根元素包裹,如下是div包裹

```
return (
	<div>
    </div>
)

改进
return (
	<Fragment>
	</Fragment> --不会渲染,如同小程序的block和vue中temple
)

缩写 
<>
 ...
</>

但要是用到key则不可以用缩写
<Fragment key={id}>
</Fragment>
```





### 2.3. StrictMode

- 当你觉得自己的代码合适,不会有什么不规范则可以不用

- 以及第三方库的方法可能过期所以警告,自己也可以不用

- 其作用:

  - 识别不安全的生命周期

  - 使用过期的ref API(还有过期的Context API),废弃的方法如findDOMNode

  - 检查意外的副作用

    - 让constructor调用两次,看有没有什么副作用,但在生产环境不会调用两次


- 开启

  - 可以对全部组件开启

    ```
    先导入 import React,{ PureComponent, StrictMode } from 'react'
    const root = ReactDOM.createRoot(document.getElementById("root"))
    root.render(
    	<StrictMode>
    		<App name="why"/>
    	</StrictMode>
    	)
    ```

  - 对单独组件开启

    ```
    一样先导入
    	<StrictMode>
    		<Home/>
        </StrictMode>
    ```

    





# 四.React过渡动画

- 先下载

  ```
  npm install react-transition-group
  or 
  yarn add react-transition-group
  ```

  

### 4.1. CSSTransition

- 通常用这个来完成过渡动画效果

- 3中状态

  - 开始状态 
    - -appeat(第一次时动画), -enter(第2及以上时执行), exit(结束时开始的动画)
  - 执行动画
    - -appear-active, -enter-active, -exit-active(结束时中间动画)
  - 执行结束
    - -appear-done, -enter-done, -exit-done(结束时结束的最后动画)

  

- 实现 - 属性timeout必须有,动画全部过程看timeout,而不是css中设置的时间(如Transition:all 1s ease) 即当timeout时间一到,无论css中设置的时间是多少,是什么状态都终止

  ```
  先导入
  <CSSTransiton 
  	in={isShow} 
  	unmountOnExit={true} 
  	className="cao" 
  	timeout={2000}
  >
  	里面再放标签如
  	<h2>哈哈哈</h2>
  </CSSTransition>
  ```

  - css中

    ```
    //进入动画
    .cao-appear {
    	transform: translateX(-150px);
    }
    .cao-appear.active {
    	transform: translateX(0);
    	transition: transform 2s ease;
    }
    .cao-enter {
    	opacity: 0;
    }
    .cap-enter-active {
    	opacity: 1;
    	transition: opacity 2s ease;
    }
    要是第一次动画和第2次及以上的动画一样则可以合并如.cao-appear,.cao-enter {....}
    ```

- in: 触发进入或者退出状态

  - 有unmountOnExit={true} ,则该组件会在执行动画结束后被移除掉
  - 当in为true,开始是会对应标签有-enter, -enter-active的class,结束或会移除刚刚两个class,并且添加-enter-done的class

- 使用appear条件
  - 需要和in同时为true

- 回调函数,主要为了检查动画的执行过程

  - ```
    <CSSTransiton 
    	in={isShow} 
    	unmountOnExit={true} 
    	className="cao" 
    	timeout={2000}
    	onEnter = {e=>clg("开始进入动画")}
    	onEntering={e=>clg("执行进入动画")}
    	onEntered={e=>clg("执行进入结束")}
    	onExit={e=>clg("开始离开动画")}
    	onExiting={e=>clg("执行离开动画")}
    	onExited={e=>clg("执行离开结束")}
    >
    ```

- 若对全部组件使用了严格模式

  ```
  root.render(
  	<StrictMode>
  		<App name="why"/>
  	</StrictMode>
  	)
  ```

  则会有警告,因为react-transition-group这个库里面有些方法过期了

  - 解决: 自己改库里面的方法(不推荐) 或 自己在当前作用域使用最新方法因为优先级可以替换库中方法

    



### 4.2. SwitchTransition

- 组件显示和隐藏时用

  - 比如一个按钮需要再on和off之间切换,我们希望on则从左侧退出,off在从右侧进入
  - SwitchTransition里面必须包含CSSTransition组件,不能直接包裹切换组件,则CSSTransition不是in属性来判断何种状态,而是key属性
  - SwitchTransition的属性mode有两种装填 out-in 与in-out

  ```
  <SwitchTransition mode="out-in">
  	<CSSTransition
  		key={isLogin ? 'exit'; "login"}
  		className="cao2"
  		timeout ={1000}
  	>
  		<button onClick={e =>this.setState({isLogin: !isLogin})}>
  			{isLogin?"退出";"登录"}
          </...>
  ```

  

  ​	css那些和CSSTransition一样

  



### 4.3. TransitionGroup

- 将多个动画组件(如li) 包裹在其中,一般用于列表中元素的动画

- 自己测试放入源数据的数据,其中提供的id值(即自己写的数据然后提交的),最好是时间戳

  - ```
    
    books.push({id:new Date().getTime, name:......})
    ```

- 实现

  ```
  <TransitionGroup Component="ul">
  	{
  		books.map((item, index) => {
  			return(
  					<CSSTransition key={item.id} className="cao3" timeout={1000}>
  						<li>
  							<span>...
                          
  				)
  		})
  	}
  ```

  

- css和CSSTransition一样

  ```
  .cao3-enter {
  	transform: translateX(150px);
  	opacity:0;
  }
  ...
  ```

  
