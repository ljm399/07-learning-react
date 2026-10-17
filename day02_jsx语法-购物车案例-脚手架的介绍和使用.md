# 一、JSX 的语法

## 1.1. 事件绑定方式

React 的事件绑定本质上仍然依赖 JavaScript 函数和 this 规则。JSX 使用驼峰形式的事件属性，例如 onClick、onChange 和 onSubmit，并把函数传给事件属性。

### 1.1.1. JavaScript 中 this 的四种绑定规则

#### 1.1.1.1. 默认绑定

普通函数独立调用时，严格模式下 this 是 undefined；非严格模式下通常指向全局对象。

~~~js
"use strict";

function foo() {
  console.log(this);
}

foo(); // undefined
~~~

#### 1.1.1.2. 隐式绑定

函数作为对象的方法调用时，this 指向调用它的对象。

~~~js
const user = {
  name: "Tom",
  sayHello() {
    console.log(this.name);
  }
};

user.sayHello(); // Tom
~~~

##### 1.1.1.2.1. 隐式绑定容易丢失

把对象方法单独取出来再调用时，调用者不再是 user，this 也会丢失。

~~~js
const sayHello = user.sayHello;
sayHello(); // 严格模式下为 undefined
~~~

###### 1.1.1.2.1.1. React 中的对应场景

类组件把方法直接传给 onClick 时，React 会在事件发生时调用该函数。为了让方法继续访问 this.state，需要提前绑定 this 或使用箭头函数。

#### 1.1.1.3. 显式绑定

call、apply 和 bind 可以显式指定函数中的 this。

~~~js
function introduce(message) {
  console.log(message, this.name);
}

const user = { name: "Tom" };

introduce.call(user, "你好");
introduce.apply(user, ["你好"]);

const boundIntroduce = introduce.bind(user);
boundIntroduce("你好");
~~~

- call：立即调用函数，参数逐个传入。
- apply：立即调用函数，参数以数组传入。
- bind：返回一个绑定了 this 的新函数，需要之后再调用。

#### 1.1.1.4. new 绑定

使用 new 调用构造函数时，JavaScript 会创建一个新对象，并把这个新对象绑定给构造函数中的 this。

~~~js
function Person(name) {
  this.name = name;
}

const person = new Person("Tom");
console.log(person.name); // Tom
~~~

### 1.1.2. React 类组件中的 this 绑定

类方法默认不会自动绑定到组件实例。下面的写法在严格模式下可能无法读取 this：

~~~jsx
class App extends React.Component {
  handleClick() {
    console.log(this); // 可能是 undefined
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}
~~~

#### 1.1.2.1. 在 constructor 中使用 bind

~~~jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ message: "已点击" });
  }

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}
~~~

bind 会返回一个新的函数，所以通常在 constructor 中绑定一次，而不是每次 render 都重新绑定。

#### 1.1.2.2. 使用箭头函数类字段

箭头函数没有自己的 this，会沿着作用域向上查找组件实例的 this：

~~~jsx
class App extends React.Component {
  handleClick = () => {
    this.setState({ message: "已点击" });
  };

  render() {
    return <button onClick={this.handleClick}>点击</button>;
  }
}
~~~

这种方式写法简洁，但需要构建工具支持 class fields。现代 React 项目通常已经默认支持。

#### 1.1.2.3. 使用 JSX 内联箭头函数

也可以在 JSX 中创建箭头函数：

~~~jsx
<button onClick={() => this.handleClick()}>
  点击
</button>
~~~

这种方式适合需要传递额外参数的场景，但每次 render 都会创建一个新的函数。一般交互简单时可以直接使用，性能敏感的列表项应结合实际情况选择。

## 1.2. 事件传递参数

### 1.2.1. 只接收 event

React 会把合成事件对象作为回调函数的第一个参数传入：

~~~jsx
function handleChange(event) {
  console.log(event.target.value);
}

<input onChange={handleChange} />
~~~

常用属性包括：

- event.target：真正触发事件的元素。
- event.currentTarget：当前绑定事件处理函数的元素。
- event.preventDefault()：阻止浏览器默认行为。
- event.stopPropagation()：阻止事件继续冒泡。

### 1.2.2. 传递额外参数

如果需要同时传递业务参数和事件对象，可以使用箭头函数：

~~~jsx
function handleDelete(id, event) {
  event.stopPropagation();
  console.log("删除", id);
}

<button onClick={(event) => handleDelete(movie.id, event)}>
  删除
</button>
~~~

也可以使用 bind，但 bind 的第一个参数用于绑定 this，额外参数从第二个位置开始：

~~~jsx
<button onClick={this.handleDelete.bind(this, movie.id)}>
  删除
</button>
~~~

### 1.2.3. 不要在渲染阶段直接调用函数

下面的写法会在 render 时立即执行 handleClick，而不是等待用户点击：

~~~jsx
// 错误
<button onClick={handleClick()}>点击</button>

// 正确
<button onClick={handleClick}>点击</button>
~~~

需要参数时，把调用包在函数中：

~~~jsx
<button onClick={() => handleClick(id)}>点击</button>
~~~

## 1.3. JSX 条件渲染

条件渲染的本质是根据状态决定返回哪个 React 元素。React 没有 v-if、v-else 和 v-show，需要使用 JavaScript 表达式实现。

### 1.3.1. 使用 if 在 JSX 外部判断

复杂条件可以先计算变量，再返回 JSX：

~~~jsx
function UserPanel({ user, loading }) {
  let content;

  if (loading) {
    content = <p>加载中...</p>;
  } else if (!user) {
    content = <p>请先登录</p>;
  } else {
    content = <p>你好，{user.name}</p>;
  }

  return <section>{content}</section>;
}
~~~

if 是语句，不能直接写在 JSX 大括号中，所以应该放在 return 之前。

### 1.3.2. 使用三元运算符

适合两个分支的简单判断：

~~~jsx
<p>{isLogin ? "欢迎回来" : "请先登录"}</p>
~~~

也可以返回不同的组件：

~~~jsx
return isLogin ? <UserInfo /> : <LoginForm />;
~~~

### 1.3.3. 使用逻辑与 &&

适合“条件成立时显示，否则不显示”：

~~~jsx
{hasPermission && <button>编辑</button>}
~~~

需要注意，左侧如果是数字 0，React 会把 0 渲染出来：

~~~jsx
// 可能显示 0
{list.length && <List items={list} />}

// 更安全
{list.length > 0 && <List items={list} />}
~~~

### 1.3.4. 使用逻辑或提供默认内容

~~~jsx
<p>{username || "未设置用户名"}</p>
~~~

如果合法值可能是 0 或空字符串，应使用 nullish coalescing：

~~~jsx
<p>{count ?? 0}</p>
~~~

### 1.3.5. React 中实现类似 v-show 的效果

v-if 的效果是条件不成立时不渲染元素；v-show 的效果是元素仍然存在，只切换 CSS。React 中可以使用 style 或 className：

~~~jsx
<div style={{ display: visible ? "block" : "none" }}>
  内容
</div>
~~~

频繁切换且保留内部状态时可以使用隐藏方式；内容很重或不需要保留状态时可以直接条件渲染。

## 1.4. JSX 列表渲染

### 1.4.1. 使用 map 渲染列表

map 会把数组中的每一项转换成一个 React 元素：

~~~jsx
const movies = [
  { id: 1, title: "星际穿越" },
  { id: 2, title: "流浪地球" }
];

<ul>
  {movies.map((movie) => (
    <li key={movie.id}>{movie.title}</li>
  ))}
</ul>
~~~

### 1.4.2. key 的作用

key 用于帮助 React 判断列表项是新增、删除还是移动。key 必须在当前列表中稳定且唯一：

- 优先使用后端返回的 id。
- 不要随机生成 key。
- 列表会增删或排序时不要使用数组下标。
- key 写在 map 返回的最外层元素上。

~~~jsx
movies.map((movie) => (
  <MovieItem key={movie.id} movie={movie} />
))
~~~

key 只提供给 React 的协调算法，组件内部不能通过 props.key 读取它。如果组件需要这个值，应额外传入 movieId。

### 1.4.3. 结合 filter 筛选

filter 返回符合条件的新数组，再交给 map 渲染：

~~~jsx
const hotMovies = movies.filter((movie) => movie.score >= 8);

<ul>
  {hotMovies.map((movie) => (
    <li key={movie.id}>{movie.title}</li>
  ))}
</ul>
~~~

### 1.4.4. 使用 slice 截取

slice 不会修改原数组，可以用于展示前几条数据：

~~~jsx
const firstThreeMovies = movies.slice(0, 3);

{firstThreeMovies.map((movie) => (
  <li key={movie.id}>{movie.title}</li>
))}
~~~

### 1.4.5. 空列表和加载状态

列表渲染还需要处理加载、错误和空数据：

~~~jsx
function MovieList({ loading, error, movies }) {
  if (loading) return <p>加载中...</p>;
  if (error) return <p>加载失败</p>;
  if (movies.length === 0) return <p>暂无电影</p>;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
~~~

## 1.5. 电影列表的点击案例

### 1.5.1. 案例需求

- 展示电影标题和评分。
- 点击列表项时显示当前电影。
- 点击删除按钮时只删除对应电影。
- 删除按钮不应触发列表项的点击事件。

### 1.5.2. 函数组件实现

~~~jsx
import { useState } from "react";

const initialMovies = [
  { id: 1, title: "星际穿越", score: 9.4 },
  { id: 2, title: "流浪地球", score: 8.3 },
  { id: 3, title: "飞驰人生", score: 8.1 }
];

function MovieList() {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelect(movie) {
    setSelectedMovie(movie);
  }

  function handleDelete(id, event) {
    event.stopPropagation();
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
    setSelectedMovie((currentMovie) =>
      currentMovie?.id === id ? null : currentMovie
    );
  }

  return (
    <section>
      <h2>电影列表</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => handleSelect(movie)}>
            <span>
              {movie.title}：{movie.score}
            </span>
            <button onClick={(event) => handleDelete(movie.id, event)}>
              删除
            </button>
          </li>
        ))}
      </ul>
      {selectedMovie && <p>当前选择：{selectedMovie.title}</p>}
    </section>
  );
}

export default MovieList;
~~~

### 1.5.3. 案例中的关键点

- 列表项使用稳定的 id 作为 key。
- setMovies 使用函数式更新，确保基于最新状态计算。
- filter 返回新数组，不直接修改原来的 state。
- stopPropagation 防止删除按钮的点击事件冒泡到 li。
- selectedMovie 可能为空，因此用条件渲染保护访问。

# 二、阶段案例练习：购物车

## 2.1. 购物车数据模型

购物车中的每一项至少需要商品 id、名称、价格和数量：

~~~js
const initialCart = [
  {
    id: 1,
    name: "机械键盘",
    price: 299,
    quantity: 1
  },
  {
    id: 2,
    name: "无线鼠标",
    price: 99,
    quantity: 2
  }
];
~~~

### 2.1.1. 哪些数据放在 state

购物车商品列表、数量变化和选中状态会影响页面，因此放在 state 中。总价可以由商品列表计算得到，不必额外保存一份容易失真的 total。

### 2.1.2. 界面展示

使用 map 展示商品，使用 key 标识每一行：

~~~jsx
function CartList({ cart, onIncrease, onDecrease, onRemove }) {
  return (
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>单价：{item.price}</span>
          <span>数量：{item.quantity}</span>
          <button onClick={() => onDecrease(item.id)}>-</button>
          <button onClick={() => onIncrease(item.id)}>+</button>
          <button onClick={() => onRemove(item.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
}
~~~

### 2.1.3. 空购物车处理

~~~jsx
{cart.length === 0 ? (
  <p>购物车为空</p>
) : (
  <CartList
    cart={cart}
    onIncrease={handleIncrease}
    onDecrease={handleDecrease}
    onRemove={handleRemove}
  />
)}
~~~

## 2.2. 购物车交互：加、减和删除

### 2.2.1. 增加商品数量

使用 map 返回新数组，只修改匹配商品的 quantity：

~~~jsx
function handleIncrease(id) {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}
~~~

### 2.2.2. 减少商品数量

数量不能小于 1 时，可以禁用减号按钮；如果业务要求数量为 0 时自动删除，也可以在更新时过滤掉该商品：

~~~jsx
function handleDecrease(id) {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}
~~~

对应按钮可以根据数量禁用：

~~~jsx
<button
  disabled={item.quantity <= 1}
  onClick={() => onDecrease(item.id)}
>
  -
</button>
~~~

### 2.2.3. 删除商品

filter 会返回不包含目标 id 的新数组：

~~~jsx
function handleRemove(id) {
  setCart((currentCart) =>
    currentCart.filter((item) => item.id !== id)
  );
}
~~~

### 2.2.4. 计算小计和总价

每行小计是单价乘数量，总价是所有小计的累加：

~~~jsx
const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
~~~

金额展示时可以统一保留两位小数：

~~~jsx
<p>合计：¥{totalPrice.toFixed(2)}</p>
~~~

### 2.2.5. 完整购物车案例

~~~jsx
import { useMemo, useState } from "react";

const initialCart = [
  { id: 1, name: "机械键盘", price: 299, quantity: 1 },
  { id: 2, name: "无线鼠标", price: 99, quantity: 2 }
];

function Cart() {
  const [cart, setCart] = useState(initialCart);

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  function handleIncrease(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  return (
    <section>
      <h2>购物车</h2>
      {cart.length === 0 ? (
        <p>购物车为空</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>
                {item.name}：¥{item.price} × {item.quantity}
              </span>
              <button
                disabled={item.quantity <= 1}
                onClick={() => handleDecrease(item.id)}
              >
                -
              </button>
              <button onClick={() => handleIncrease(item.id)}>+</button>
              <button onClick={() => handleRemove(item.id)}>
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
      <strong>合计：¥{totalPrice.toFixed(2)}</strong>
    </section>
  );
}

export default Cart;
~~~

### 2.2.6. 不可变数据更新原则

不要直接执行 push、splice 或给原对象属性赋值：

~~~jsx
// 错误：直接修改原数组
cart.push(newItem);
cart[0].quantity += 1;
~~~

应该使用 map、filter、slice、展开运算符等方式返回新数组或新对象：

~~~jsx
const nextCart = cart.map((item) =>
  item.id === id
    ? { ...item, quantity: item.quantity + 1 }
    : item
);
~~~

React 通过引用变化判断是否需要更新。保持数据不可变可以让状态更新、性能优化和调试更加可靠。

# 三、React 脚手架的使用

## 3.1. 脚手架是什么

### 3.1.1. 脚手架解决的问题

一个完整项目通常需要多个目录和文件，还要配置 JSX 编译、模块打包、开发服务器、代码检查和生产部署。脚手架会提前生成一套可运行的项目结构和默认配置。

脚手架主要帮助完成：

- 创建目录结构和基础入口文件。
- 安装 React、React DOM 和构建工具。
- 配置 JSX、CSS、图片和模块的处理方式。
- 提供开发服务器、热更新和生产构建命令。
- 统一依赖版本和 npm scripts。

### 3.1.2. Node.js 和 npm

Webpack、Vite、Babel 等工具运行在 Node.js 环境中。npm 是 Node.js 常用的包管理器，用于安装依赖和运行项目脚本。

~~~bash
node -v
npm -v
~~~

如果需要在多个 Node 版本之间切换，可以使用 nvm：

~~~bash
nvm list
nvm use 20
node -v
~~~

### 3.1.3. 脚手架的运行流程

~~~text
源代码（JSX、CSS、图片）
        ↓
编译和模块解析
        ↓
开发服务器或生产打包
        ↓
浏览器加载入口文件
~~~

脚手架不是 React 本身，它是围绕 React 项目的工程化工具集合。

## 3.2. 使用 Create React App 创建项目

Create React App（CRA）是早期学习 React 常用的脚手架，能够自动配置 React、Babel、Webpack 和开发服务器。它的命令仍适合阅读旧课程，但新项目通常优先选择 Vite。

### 3.2.1. 推荐使用 npx 创建

不建议为了创建一个项目而全局安装固定版本的 create-react-app，可以使用 npx 临时执行：

~~~bash
npx create-react-app react-demo
cd react-demo
npm start
~~~

浏览器打开 http://localhost:3000 即可查看开发页面。

### 3.2.2. 项目命名规则

npm 包名和 CRA 项目名通常使用小写字母、数字和连字符：

~~~bash
npx create-react-app react-demo
~~~

避免使用大写字母、空格和特殊符号，否则可能无法通过 npm 的包名校验。项目名称应简短，并能表达项目用途。

### 3.2.3. 常用 npm 命令

~~~bash
npm install       # 安装 package.json 中的依赖
npm start         # 启动开发服务器
npm test          # 运行测试
npm run build     # 生成生产环境文件
~~~

package.json 中的 scripts 字段决定了 npm start 和 npm run build 实际执行的命令。

### 3.2.4. 使用 Vite 创建现代项目

Vite 启动速度快，配置更轻量，适合新项目：

~~~bash
npm create vite@latest react-vite-demo -- --template react
cd react-vite-demo
npm install
npm run dev
~~~

Vite 默认开发地址通常是 http://localhost:5173。

## 3.3. CRA 目录结构和 PWA

### 3.3.1. 常见目录

~~~text
react-demo/
├─ node_modules/       安装后的依赖，通常不提交到 Git
├─ public/              不经过模块处理的静态资源
│  ├─ index.html        页面模板
│  ├─ favicon.ico       网站图标
│  └─ manifest.json     PWA 的应用清单
├─ src/                 业务源代码
│  ├─ App.js            根组件
│  ├─ App.css           根组件样式
│  ├─ index.js          应用入口
│  └─ index.css         全局样式
├─ package.json         项目元信息、依赖和 scripts
└─ package-lock.json    依赖版本锁定文件
~~~

### 3.3.2. public 和 src 的区别

- public 中的文件通常通过绝对路径直接访问，不经过 import 处理。
- src 中的代码和资源会参与编译、依赖分析和打包。
- 图片、字体等需要被模块管理的资源，通常放在 src 中并通过 import 引入。
- public 适合 favicon、manifest 等需要保持固定文件名的资源。

### 3.3.3. PWA 是什么

PWA（Progressive Web App）通过 Web App Manifest、Service Worker 和缓存策略，让网页具备接近应用的体验，例如安装到桌面、离线访问和推送能力。

~~~json
{
  "short_name": "React App",
  "name": "React Shopping Cart",
  "start_url": ".",
  "display": "standalone"
}
~~~

manifest 只描述应用信息，不会自动提供完整的离线能力。要实现离线缓存，还需要注册并正确编写 Service Worker。CRA 模板是否包含 Service Worker 取决于版本和模板配置。

## 3.4. 从零编写项目代码

### 3.4.1. index.html

index.html 提供浏览器加载的 HTML 外壳，并提供 React 挂载的根节点：

~~~html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Demo</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
~~~

### 3.4.2. index.js

index.js 是应用入口，负责导入样式、创建根节点并渲染 App：

~~~jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~

React 18 中 createRoot 从 react-dom/client 导入。StrictMode 只在开发环境帮助发现潜在问题，不会在生产环境产生额外的用户界面。

### 3.4.3. App.jsx

App 是应用的根组件，可以继续拆分出购物车、商品列表和结算栏：

~~~jsx
import { useState } from "react";
import Cart from "./components/Cart";

function App() {
  const [message] = useState("欢迎来到购物车");

  return (
    <main>
      <h1>{message}</h1>
      <Cart />
    </main>
  );
}

export default App;
~~~

组件文件默认导出的名称可以在导入时自定义，但文件路径和实际导出方式必须匹配。

### 3.4.4. 组件和样式拆分

推荐按照功能拆分目录：

~~~text
src/
├─ components/
│  ├─ Cart.jsx
│  ├─ CartItem.jsx
│  └─ ProductList.jsx
├─ App.jsx
├─ App.css
├─ index.jsx
└─ index.css
~~~

一个组件只负责清晰的职责，父组件通过 props 传入数据和事件，子组件通过回调函数通知父组件。

## 3.5. 脚手架中的 Webpack 配置

### 3.5.1. Webpack 的作用

Webpack 会从入口文件开始分析 import 关系，把 JavaScript、JSX、CSS、图片等资源转换并打包成浏览器可以加载的文件。

~~~text
入口文件
  ↓
解析 import 依赖
  ↓
Loader 转换 JSX、CSS、图片
  ↓
Plugin 执行额外任务
  ↓
输出 bundle 文件
~~~

### 3.5.2. Loader 和 Plugin

- Loader：把某种文件转换成 Webpack 可以处理的模块，例如 Babel Loader 处理 JSX。
- Plugin：参与更完整的构建流程，例如生成 HTML、提取 CSS、压缩资源。
- entry：打包入口。
- output：输出文件位置和文件名。
- mode：development 或 production。

### 3.5.3. CRA 为什么看不到 Webpack 配置

CRA 使用 react-scripts 把 Webpack、Babel 和相关配置封装起来，开发者只需要使用 npm start 和 npm run build。

如果确实需要修改配置，可以选择：

- 使用 craco、react-app-rewired 等扩展工具。
- 执行 npm run eject 暴露配置，但这是不可逆操作。
- 新项目改用 Vite 或自行维护 Webpack 配置。

### 3.5.4. 开发环境和生产环境

开发环境重视启动速度、报错提示和热更新；生产环境重视压缩、缓存、代码分割和体积优化：

~~~bash
npm start
npm run build
~~~

生产构建生成的文件通常位于 build 目录，需要部署到静态服务器或 CDN。部署前应检查环境变量、接口地址、路由刷新和静态资源路径。

### 3.5.5. 脚手架使用注意事项

- node_modules 不要提交到 Git，使用 package.json 和 lock 文件恢复依赖。
- 团队成员尽量使用一致的 Node.js 和包管理器版本。
- 修改依赖后重新安装并检查 lock 文件。
- 生产构建前先执行一次本地预览或静态服务器验证。
- 不要为了修改一个小配置直接 eject，先确认扩展工具是否足够。
