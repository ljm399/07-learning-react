# 一.JSX的语法

### 1.1.事件绑定方式

- 默认绑定
  - foo()
- 隐式绑定
  - obj.foo() => obj
- 显示绑定:
  - call/apply/bind  
  - foo.call("aaa")
- new绑定
  - new Foo() ->创建个新对象,并且赋值给this





#### 1.1.1. this绑定

​	在非render函数里面定义的对象或函数(非),其this指向undefined



- bind

  - 直接xx.bind(obj)

  

- es6 class field
  - 箭头函数

    - 向上找,则是render的this

  - ```
    <button onClick={() =>this.btnClick()}绑定了this
    
    对应
    <button onClick={this.Click} 是默认绑定,this还是undefined,非严格模式下是window
    ```

    

    

- 传值 箭头函数

  - bind缺陷
    - 若要event,this,以及其他参数一起传,则可能传错 因为第一个参数限制为this
  - 箭头函数优势
    - 直接传,不用担心

  



#### 1.1.2. 传递参数

- event
- 额外的参数





### 1.2.jsx条件渲染

- if判断
- 三元运算符
- &&逻辑与
- v-show实现效果





### 1.3. jsx列表渲染

- map高阶函数(重要)
- filter
- slice



### 1.4.电影列表的点击案例





# 二.阶段案例练习-购物车

### 2.1.界面数据展示





### 2.2.交互操纵+-/删除





# 三.React的脚手架的使用

### 3.1. 介绍

- 提高项目搭建-项目部署效率
  - 一个项目可能要多个作用域而不是在一个文件中
  - 然后要引入其他库(如网络请求axios),以及其依赖包与版本更新
  - webpack打包与部署
  - 以上3个脚手架自动完成--如同建筑先搭好框架(脚手架帮你搭好框架)

- node环境
  - 因为需要webpack, webpack依赖node环境




### 3.2.使用create-react-app创建项目

- 安装架手架
  - npm install create-react-app -g
  - nvm list 查看node的版本
  - npm -v 看当前node版本环境下npm的版本
  - node的版本可以nvm use +版本 切换node版本
    - 然后再不同的node版本环境下安装不同版本npm版本
- **项目名称不同大写**
- 默认打包是npm





### 3.3.目录结构的分析和PWA介绍





### 3.4. 从零编写项目代码

- index.js
- App.jsx



### 3.5.脚手架中webpack配置





