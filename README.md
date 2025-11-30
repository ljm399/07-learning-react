# React 18 系统学习笔记

## 📖 项目简介

这是一个**完整的 React 18 学习路径**，从基础到高级，涵盖了 React 生态系统的核心内容。包括 React 核心语法、组件化开发、Redux 状态管理、React Router 路由、React Hooks、以及爱彼迎（Airbnb）实战项目等内容。

**学习来源**：跟随 [codewhy](https://github.com/coderwhy) 老师系统学习

## 📚 学习路径

### 1️⃣ React 基础阶段

#### 1. React 核心概念 (`day01-day02`)

- ✅ React 介绍和前端地位
- ✅ React 开发环境搭建
- ✅ JSX 语法详解
- ✅ 组件的定义和使用
- ✅ React 渲染原理
- ✅ 虚拟 DOM 和 Diff 算法

**学习笔记**：`day01.md`、`day02.md`

---

### 2️⃣ 组件化开发阶段

#### 2. 组件深入学习 (`day03-day05`)

- ✅ 类组件和函数组件
- ✅ 组件的生命周期
- ✅ 组件通信（Props、Context）
- ✅ 受控组件和非受控组件
- ✅ 表单处理和事件绑定
- ✅ ref 的使用

**学习笔记**：`day03.md`、`day04.md`、`day05.md`

**实战练习**：`组件通信案例/`

---

### 3️⃣ Redux 状态管理阶段

#### 3. Redux 核心 (`day06-day08`)

- ✅ Redux 核心概念（Store、Action、Reducer）
- ✅ Redux 三大原则
- ✅ Redux 中间件（Thunk、Saga）
- ✅ Redux 异步操作
- ✅ Redux 工具链（Redux DevTools）
- ✅ Redux 模块化管理

**学习笔记**：`day06.md`、`day07.md`、`day08.md`

**实战项目**：`day6_redux_case/`

#### 4. Redux Toolkit (`day6_redux-toolkit`)

- ✅ Redux Toolkit 简化开发
- ✅ createSlice 的使用
- ✅ configureStore 配置
- ✅ RTK Query 数据请求

**实战项目**：`day6_redux-toolkit/`

---

### 4️⃣ React Router 阶段

#### 5. React Router 6.x (`day8-reactrouter`)

- ✅ React Router 基础配置
- ✅ 路由导航和跳转
- ✅ 动态路由和路由参数
- ✅ 嵌套路由
- ✅ 路由守卫和权限控制
- ✅ 编程式导航

**学习笔记**：`day08.md`

**实战项目**：`day8-reactrouter/`

---

### 5️⃣ React Hooks 阶段

#### 6. React Hooks 详解 (`day9-reacthooks`)

- ✅ useState - 状态管理
- ✅ useEffect - 副作用处理
- ✅ useContext - 上下文共享
- ✅ useReducer - 复杂状态管理
- ✅ useCallback - 函数缓存
- ✅ useMemo - 值缓存
- ✅ useRef - 引用 DOM 和值
- ✅ useImperativeHandle - 暴露方法
- ✅ useLayoutEffect - 同步副作用
- ✅ 自定义 Hooks 封装

**学习笔记**：`day09.md`、`day10.md`、`day11.md`、`day12.md`、`day13.md`、`day14.md`


---

## 🛠️ 技术栈

### 核心技术

- **React 18**：最新版本的前端框架
- **Redux / Redux Toolkit**：状态管理库
- **React Router v6**：路由管理
- **React Hooks**：函数式组件开发
- **JSX**：JavaScript XML 语法

### 开发工具

- **Create React App**：React 官方脚手架
- **Webpack**：模块打包工具
- **Babel**：JavaScript 编译器
- **ESLint**：代码规范检查
- **Axios**：HTTP 请求库

### UI 组件库

- **Ant Design**：企业级 UI 组件库
- **Material-UI**：Material Design 组件库
- **styled-components**：CSS-in-JS 解决方案

---

## 🚀 快速开始

### 环境要求

- Node.js: >=14.0.0
- npm 或 yarn

### 创建 React 项目

```bash
# 使用 Create React App 创建项目
npx create-react-app my-app

# 进入项目目录
cd my-app

# 启动开发服务器
npm start
```

### 运行学习案例

```bash
# 以 Redux 案例为例
cd day6_redux_case

# 安装依赖
npm install

# 启动项目
npm start

# 项目将在 http://localhost:3000 启动
```

### 运行 Airbnb 项目

```bash
# 进入项目目录
cd airbnb

# 安装依赖
npm install
# 或
yarn install

# 启动开发服务器
npm start

# 项目将在 http://localhost:3000 启动
```

---

## 📚 学习收获

- ✅ React 18 核心概念和新特性深入理解
- ✅ 组件化开发思想和最佳实践
- ✅ Redux 和 Redux Toolkit 状态管理方案
- ✅ React Router 路由配置和使用
- ✅ React Hooks 的深入应用和自定义封装
- ✅ styled-components CSS-in-JS 最佳实践
- ✅ 项目工程化和代码规范

