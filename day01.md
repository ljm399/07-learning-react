# 一. React在前端的重要性

### 1.1. React基本介绍

- 官方React定义
- Vue/React/Angular市场占有率(国内)
  - Vue最多
  - React第二
    - 比vue还要原生





### 1.2. 如何系统学一个编程语言

- 官方文档
- 看书
- 开源项目
- 当前课程



# 二 . 邂逅React开发

### 学习过程

1. React核心语法

2. Rudx状态管理使用

3. React Router6.x路由

4. React Hooks的使用详细

5. 爱彼迎实战

6. React项目的自动化部署

   

### 2.1. React介绍

- 声明式编程
- 组件化开发
- 一次学习,多平台适配



### 2.2. React有三个依赖

- React
- React-DOM
- Babel



#### 2.2.2. 引入方式(引入这三个依赖)

- CDN引入
- 下载引入
- npm下载引入(脚手架)



```
<script type="text/babel"></script>
```





#### 2.2.1 通过普通方式实现案例

- 没有封装组件,直接默认逻辑实现

```
<div id="root"></div>
<script type... >
let message ="hello world"
funciton btn() {
	message = "hello React"
	rootRender() //每次触发时间都重新渲染
}
const root = ReactDOM.createRoot(document.querySeletor("#root"))
function rootRentder() {
	root.render((
		<div>
			<h2>{message}</h2>  //只有一种语法就大括号包裹 {}
			<button onclick={btn}>修改文本</button>
	))
}
rootRender() //重新渲染
</script>
```





#### 2.2.2. 通过封装App组件实现

```
class App extends React.Componet {}
```

- 多次使用

- 里面内容

  - 组件数据
    - construct() {}
  - 组件方法

  - 渲染内容render方法

    - ```
      render() {
      	return (
      		<div>{this.state.message}</h2>
      		...
      	)
      }
      ```

    - 



#### 2.2.3. 将组件渲染到界面

```
const root = ReactDOM.createRoot(Document.querySelector("#root"))
root.render(<App/>)
```





#### 2.2.4. 数据放到哪里: 

- 数据分类

  - 参与界面更新的数据
  - 不参与

  

- 参与数据流放在
  - constructor() {} 这个App类的构造函数里面的this.state{}
    - super()
    - this.state = {}
      - 当this.state里面的数据变化,会进行update操作,重新调用render函数







#### 2.2.5. 绑定方法:this绑定

- 使用babel则编译处于 严格模式
  - 本来this执行window则变为undefined









# 三. JSX的细节语法

### 3.1. 对JSX定义以及思想

- 为什么React选择JSX编写
  - vue或JavaScript编写要将html,css,js分开,JSX直接结合了
  - 所有逻辑都交给你来编写,而不是封装让你看不见






- JSX是JavaScript语法的扩展,他可以将UI界面和JavaScript融合一起
  - const e = <div>hello</div>
  - 故有"all in jsx"
    - html in js
    - css in js
    - js in js


- 不同与vue,他里面语法和JavaScript一样,你不用学模版语法如v-for,v-if,v-else,v-bind

​	

### 3.2. JSX的书写规范

- 必须有根元素
  - 不能并列两个<div>,只能一个

- 推荐()包裹  方便阅读
  - 在jsx的外层包裹一个()

- 单标签/双标签
  - 如果是单标签则必须以 /> 结尾




### 3.3. JSX的注释写法

```
return (
	<div>
	{/* 我是注释*/}
	{message}
	</div>
	)
```





### 3.4.JSX的插入子元素

- Number/String/Array这3个数据类型直接展示
- undefined/null/Boolean,显示内容为空
  - 如果希望展示则转为字符串
    - toString,或和空字符串拼接

- Object不能插入
  - 需要具体点
    - 如{obj.name} 



### 3.5.可以插入({})

- 运算表达式

  - 3+4

- 三元表达式

  - ?:

- 执行一个函数

  - ```
    <ul>
    	{this.state.movies.map(item=><li>{item}</li>)}
    <ul>
    ```





### 3.6. JSX绑定属性

```
const {title, imgurl, href, className} = this.state
```



- 基本属性

  - ```
    <h2 title ={title}
    <img src={imgurl}
    <a href={href}
    ```
  - 

- class属性

  - 不用使用class而是className,因为class是个关键字用于定义类,用class会冲突

    - ```
      <h2 className={className}
      ```

      

- style属性

  - 对象类型

    - ```
      <h2 style={color:red}
      ```

      










