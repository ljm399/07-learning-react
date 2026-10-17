# 一、React 在前端的重要性

## 1.1. React 基本介绍

### 1.1.1. React 是什么

React 是 Meta（原 Facebook）开源的 JavaScript 库，主要用于构建用户界面。它负责描述界面和处理组件之间的状态变化，路由、请求、状态管理等能力可以根据项目需要组合其他库。

#### 1.1.1.1. React 的核心特点

- **声明式编程**：只需要描述“数据对应什么界面”，状态发生变化时由 React 重新计算界面。
- **组件化开发**：把页面拆成可以复用、组合和独立维护的组件。
- **单向数据流**：父组件通过 props 向子组件传递数据，子组件通过回调函数通知父组件更新。
- **跨平台能力**：React 的思想可以用于 Web（React DOM）、原生应用（React Native）以及其他渲染目标。
- **生态完善**：路由、状态管理、请求、测试和工程化工具都有成熟方案。

##### 1.1.1.1.1. React 与 Vue、Angular 的关系

React、Vue 和 Angular 都能用于构建前端应用，但定位有所不同：

| 技术 | 定位 | 常见特点 |
| --- | --- | --- |
| React | UI 库 | 灵活、组件生态丰富，需要自行组合工程方案 |
| Vue | 渐进式框架 | 上手简单，官方配套较完整，模板语法直观 |
| Angular | 完整框架 | 约束较多，内置依赖注入、路由和表单等能力 |

###### 1.1.1.1.1.1. 选择技术时的记忆点

技术选型应结合团队经验、项目规模、生态和维护成本。React 并不是唯一答案，但它的组件模型和生态使其适合中大型项目以及需要跨平台复用思路的场景。

### 1.1.2. React 解决的问题

直接使用 DOM API 编写复杂页面时，开发者需要手动查找节点、修改节点、处理事件以及同步多个界面状态，代码容易互相影响。React 把页面拆成组件，并根据状态生成界面，从而降低了复杂交互的维护成本。

~~~jsx
function Welcome({ name }) {
  return <h2>你好，{name}</h2>;
}
~~~

上面的组件只关心 name 如何显示，不需要手动调用 querySelector 或 innerText。

## 1.2. 如何系统学习一个编程语言或框架

### 1.2.1. 学习资料的使用顺序

1. 先看官方文档，确认概念、API 和推荐写法。
2. 通过小案例练习语法，把知识转换成代码。
3. 阅读开源项目，观察目录结构、组件拆分和错误处理方式。
4. 根据当前课程或项目目标整理自己的笔记。
5. 定期复盘，把容易混淆的规则写成示例和对比表。

### 1.2.2. React 的推荐学习路线

- JSX 与事件绑定。
- 组件、props、state 和组件通信。
- 生命周期和 Hooks。
- 路由与全局状态管理。
- 请求、表单、性能优化和工程化部署。

学习每个阶段时，都应该完成一个可以运行的小案例，而不是只记忆 API 名称。

# 二、邂逅 React 开发

## 2.1. React 的学习过程

1. React 核心语法和 JSX。
2. 组件化开发与组件通信。
3. Hooks 的使用。
4. Redux 等状态管理方案。
5. React Router 6.x 路由。
6. 综合项目、构建和自动化部署。

## 2.2. React 的基本思想

### 2.2.1. 声明式编程

命令式写法需要逐步告诉浏览器“先找到节点，再修改文本，再修改样式”。声明式写法只描述当前状态对应的 UI，React 负责完成更新。

~~~jsx
function Counter({ count }) {
  return <button>当前数量：{count}</button>;
}
~~~

### 2.2.2. 组件化开发

组件通常包含自己的结构、样式、数据和行为。一个组件可以在多个页面中复用，也可以继续拆分成更小的组件。

~~~jsx
function UserCard({ user }) {
  return (
    <article className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}
~~~

### 2.2.3. 一次学习，多平台适配

React 的组件化和声明式思想可以迁移到不同渲染平台。Web 项目使用 React DOM，移动端项目可以使用 React Native；平台 API 不同，但数据驱动界面的思路相同。

## 2.3. React 的三个基础依赖

### 2.3.1. react

react 提供组件、createElement、Hooks 等核心能力，负责描述要渲染的元素和组件树。

### 2.3.2. react-dom

react-dom 负责把 React 元素渲染到浏览器 DOM。React 18 中通常通过 createRoot 创建根节点。

~~~jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
~~~

### 2.3.3. Babel

Babel 是 JavaScript 编译工具，可以把 JSX 和较新的 JavaScript 语法转换成浏览器或构建工具可以处理的代码。使用 Vite 等脚手架时，Babel 或其他编译工具通常由工程配置自动完成。

## 2.4. 引入 React 的方式

### 2.4.1. CDN 引入

适合快速演示或学习单个语法。需要先引入 React、React DOM 和 Babel，再使用 type="text/babel" 的脚本标签。

~~~html
<div id="root"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  // 在这里编写 JSX
</script>
~~~

### 2.4.2. 下载文件引入

可以把依赖下载到本地后通过 <script> 引入，适合没有网络或需要固定版本的演示环境，但依赖管理和模块化能力较弱。

### 2.4.3. npm 和脚手架引入

实际项目通常使用 npm 管理依赖，并用 Vite 等工具创建项目：

~~~bash
npm create vite@latest react-demo -- --template react
cd react-demo
npm install
npm run dev
~~~

使用脚手架后，可以按模块导入依赖，获得热更新、代码分割、构建和部署配置等能力。

## 2.5. 不封装组件的简单案例

### 2.5.1. 案例结构

这种写法把数据、事件和渲染函数都放在同一个脚本中，适合用来理解 React 的最小运行过程。

~~~jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let message = "hello world";

function handleClick() {
  message = "hello React";
  render();
}

function render() {
  root.render(
    <div>
      <h2>{message}</h2>
      <button onClick={handleClick}>修改文本</button>
    </div>
  );
}

render();
~~~

### 2.5.2. 案例中的关键点

- JSX 中使用 {message} 读取 JavaScript 变量。
- React 事件名使用驼峰形式，例如 onClick，而不是 HTML 的 onclick。
- 数据改变后需要再次调用 render，这说明了组件状态的重要性。
- 真实项目不会手动管理所有渲染，而是使用组件的 state 或 Hooks。

## 2.6. 封装 App 组件

### 2.6.1. 类组件的基本结构

类组件继承 React.Component，通常包含构造函数、状态、事件方法和 render 方法。现代 React 更推荐函数组件和 Hooks，但理解类组件有助于阅读旧项目。

~~~jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "hello world"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ message: "hello React" });
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={this.handleClick}>修改文本</button>
      </div>
    );
  }
}
~~~

### 2.6.2. 组件中的主要内容

- constructor：初始化 state，并在需要时绑定方法。
- state：保存由组件自己管理、并且会影响界面的数据。
- 组件方法：处理点击、输入、请求等交互逻辑。
- render：根据 props 和 state 返回 JSX。

## 2.7. 将组件渲染到界面

### 2.7.1. React 18 的写法

~~~jsx
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
~~~

### 2.7.2. 代码检查

- 页面中必须存在与选择器匹配的根元素，例如 <div id="root"></div>。
- createRoot 从 react-dom/client 导入，不要从 react 导入。
- 组件名称必须以大写字母开头，<App /> 才会被识别为组件。

## 2.8. 数据应该放在哪里

### 2.8.1. 先判断数据是否参与界面更新

#### 2.8.1.1. 参与界面更新的数据

用户输入、选中状态、列表数据、加载状态和弹窗显示状态等，只要变化后需要更新界面，就应该放在 state 中，或由父组件通过 props 传入。

#### 2.8.1.2. 不参与界面更新的数据

固定常量、不会影响渲染的配置、临时计算结果和 DOM 引用不一定要放进 state。不需要触发渲染的数据可以使用普通变量或 ref 保存。

### 2.8.2. 类组件中的 state

~~~jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loading: false
    };
  }

  render() {
    return <p>{this.state.username || "未登录"}</p>;
  }
}
~~~

调用 setState 后，React 会安排组件更新，并在合适的时机重新调用 render。不要直接修改 this.state：

~~~jsx
// 错误：不会可靠地触发更新
this.state.username = "Tom";

// 正确
this.setState({ username: "Tom" });
~~~

### 2.8.3. 函数组件中的对应写法

函数组件使用 useState 保存会影响界面的数据：

~~~jsx
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("hello world");

  return (
    <button onClick={() => setMessage("hello React")}>
      {message}
    </button>
  );
}
~~~

## 2.9. 类组件中的 this 绑定

### 2.9.1. 为什么会丢失 this

Babel 编译后的代码通常处于严格模式，普通函数的 this 不再自动指向 window。把类方法作为事件处理函数传递时，调用者发生变化，方法内部的 this 可能是 undefined。

### 2.9.2. 常见绑定方式

#### 2.9.2.1. 在构造函数中绑定

~~~jsx
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
~~~

#### 2.9.2.2. 使用箭头函数类字段

~~~jsx
handleClick = () => {
  this.setState({ message: "hello React" });
};
~~~

#### 2.9.2.3. 在 JSX 中使用箭头函数

~~~jsx
<button onClick={() => this.handleClick()}>修改文本</button>
~~~

函数组件没有类实例的 this，通常直接使用闭包和 Hooks 管理数据与事件。

# 三、JSX 的细节语法

## 3.1. JSX 的定义和思想

### 3.1.1. JSX 是 JavaScript 的语法扩展

JSX 允许在 JavaScript 中书写类似 HTML 的结构：

~~~jsx
const element = <div className="box">hello React</div>;
~~~

JSX 不是字符串，也不是浏览器原生可以直接执行的 HTML。它会在构建阶段被 Babel 等工具转换成 React 元素。

### 3.1.2. “all in JSX” 的含义

组件可以把结构、样式类名、事件和数据逻辑放在一起管理：

- HTML in JS：在 JavaScript 中描述界面结构。
- CSS in JS：通过 className、style 或 CSS 模块关联样式。
- JS in JS：在 {} 中使用变量、函数和表达式。

这并不代表所有代码都必须写在一个文件里，而是强调组件内部的 UI 与逻辑具有明确的对应关系。

### 3.1.3. JSX 的编译过程

~~~jsx
const element = <h2 className="title">hello</h2>;
~~~

经过编译后会变成类似下面的调用：

~~~js
const element = React.createElement(
  "h2",
  { className: "title" },
  "hello"
);
~~~

在新的 JSX 转换中，编译器可能使用 jsx 运行时，但“JSX 描述元素，运行时创建 React 元素”的思想不变。

## 3.2. JSX 的书写规范

### 3.2.1. 必须有一个根元素

错误写法是让两个元素并列返回：

~~~jsx
// 错误
return (
  <h2>标题</h2>
  <p>内容</p>
);
~~~

可以使用真实容器或 Fragment 包裹：

~~~jsx
return (
  <>
    <h2>标题</h2>
    <p>内容</p>
  </>
);
~~~

### 3.2.2. 使用括号包裹多行 JSX

~~~jsx
return (
  <section>
    <h2>标题</h2>
    <p>内容</p>
  </section>
);
~~~

括号可以避免自动分号插入造成的返回值问题，也便于格式化和阅读。

### 3.2.3. 单标签和双标签

没有子元素的标签必须使用自闭合写法：

~~~jsx
<img src={imageUrl} alt="示例图片" />
<input type="text" />
~~~

有子元素的标签需要成对出现：

~~~jsx
<button>提交</button>
~~~

### 3.2.4. 属性名称使用 JavaScript 规则

大多数属性使用驼峰命名，例如 tabIndex、autoFocus、onClick。HTML 中的 class 和 for 在 JSX 中分别写成 className 和 htmlFor。

## 3.3. JSX 的注释写法

### 3.3.1. JSX 标签内部的注释

~~~jsx
return (
  <div>
    {/* 我是 JSX 注释，不会显示在页面上 */}
    {message}
  </div>
);
~~~

### 3.3.2. JSX 外部的注释

在 JSX 外部就是普通 JavaScript，可以使用 // 或 /* ... */：

~~~jsx
// 计算要显示的标题
const title = "首页";
~~~

不能直接把 // 放到标签之间，否则它会被当成 JSX 内容解析。

## 3.4. JSX 中可以插入的子元素

### 3.4.1. 字符串、数字和数组

字符串和数字可以直接渲染，数组中的可渲染元素也可以渲染：

~~~jsx
const title = "React";
const count = 3;
const tags = ["JSX", "组件"];

return (
  <div>
    <h2>{title}</h2>
    <p>数量：{count}</p>
    <p>{tags.join("、")}</p>
  </div>
);
~~~

### 3.4.2. undefined、null 和布尔值

undefined、null 和 true、false 默认不会在页面上显示文本：

~~~jsx
<div>{null}{undefined}{false}</div>
~~~

如果确实需要显示它们，应先转换成字符串：

~~~jsx
<div>{String(value)}</div>
~~~

### 3.4.3. 对象不能直接渲染

下面的写法会报错，因为普通对象不是合法的 React 子元素：

~~~jsx
// 错误：Objects are not valid as a React child
<div>{user}</div>
~~~

应该读取对象的具体属性，或者先转换成 JSON 字符串：

~~~jsx
<div>{user.name}</div>
<pre>{JSON.stringify(user, null, 2)}</pre>
~~~

### 3.4.4. 列表渲染和 key

使用 map 生成多个元素时，为每个同层级元素提供稳定的 key：

~~~jsx
<ul>
  {movies.map((movie) => (
    <li key={movie.id}>{movie.title}</li>
  ))}
</ul>
~~~

key 用于帮助 React 识别列表项。优先使用后端提供的唯一 ID，只有列表顺序永远不变时才考虑使用数组下标。

## 3.5. {} 中可以插入什么

大括号中可以放 JavaScript **表达式**，表达式必须能够计算出一个值。

### 3.5.1. 运算表达式

~~~jsx
<p>{3 + 4}</p>
<p>{price * quantity}</p>
~~~

### 3.5.2. 三元表达式

~~~jsx
<p>{isLogin ? "欢迎回来" : "请先登录"}</p>
~~~

### 3.5.3. 调用函数和列表处理

~~~jsx
<p>{formatPrice(price)}</p>

<ul>
  {movies.map((movie) => (
    <li key={movie.id}>{movie.title}</li>
  ))}
</ul>
~~~

### 3.5.4. 不能直接放语句

if、for、switch 等是语句，不能直接写在 JSX 大括号中。可以先在 JSX 外部计算，或使用三元表达式、逻辑与：

~~~jsx
const content = isLoading ? <p>加载中...</p> : <List />;

return (
  <section>
    {hasPermission && <button>编辑</button>}
    {content}
  </section>
);
~~~

## 3.6. JSX 绑定属性

### 3.6.1. 绑定普通属性

使用 ={} 绑定 JavaScript 变量，固定字符串也可以直接写在引号中：

~~~jsx
const { title, imageUrl, href } = props;

<h2 title={title}>标题</h2>
<img src={imageUrl} alt="封面" />
<a href={href}>查看详情</a>
~~~

### 3.6.2. className 属性

JSX 中使用 className，不要写 class：

~~~jsx
<h2 className="title">标题</h2>
<div className={active ? "item active" : "item"}>内容</div>
~~~

class 是 JavaScript 的关键字，React 使用 className 来表示 DOM 的 class 属性。

### 3.6.3. style 属性

style 接收 JavaScript 对象，属性名使用驼峰形式，带单位的数值通常写成字符串：

~~~jsx
const style = {
  color: "red",
  fontSize: "20px",
  marginTop: 8
};

<h2 style={style}>标题</h2>
~~~

不能把 CSS 文本直接写成 style={color:red}；如果是多行样式，先定义对象更容易维护。

### 3.6.4. 绑定事件

事件属性需要传入函数，不能在渲染时立即调用：

~~~jsx
function handleClick(event) {
  console.log(event.currentTarget);
}

<button onClick={handleClick}>点击</button>
<button onClick={() => handleDelete(id)}>删除</button>
~~~

React 事件名使用驼峰形式，例如 onClick、onChange、onSubmit。表单输入通常通过 event.target.value 读取值。

### 3.6.5. 展开属性

当多个属性已经保存在对象中时，可以使用展开语法：

~~~jsx
const buttonProps = {
  type: "button",
  className: "primary",
  onClick: handleClick
};

<button {...buttonProps}>提交</button>
~~~

展开属性应放在明确的位置，后面的同名属性会覆盖前面的属性。不要把不必要的对象属性全部传给 DOM 元素。
