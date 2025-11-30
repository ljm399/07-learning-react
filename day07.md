# 一. Redux的用法 (有对应代码:day6-Redux-case)

### 1.1. react-redux库使用(重要):  -- connect

因为每个组件都会重复使用以下代码

```

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
   increment(num) {
    store.dispatch(incrementAction(num))
  }
```



- 解决:react-redux:  redux代码和react组件联系起来 

  - npm install react-redux

  - connect 把组件变为 <useConnect {...mapStateToProps} {...mapDispatchToProps} />

    ```
    UseConnect.js
    
    import { incrementAction,decrementAction } from '../store/actionCreators'
    import { connect } from 'react-redux'
    
    
    export class useConnect extends Component {
      addNum(num, isAdd) {
        if (isAdd) {
          this.props.incrementAction(num)
        } else {
          this.props.decrementAction(num)
        }
      }
      
    const mapStateToProps = (state) => ({
      counter: state.counter
    })
    
    const mapDispatchToProps = (dispatch) => {
      return {
        incrementAction: (num) => dispatch(incrementAction(num)),
        decrementAction: (num) => dispatch(decrementAction(num))
      }
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(useConnect)
    ```

  - ```
    index.js中添加
    
    import { Provider } from 'react-redux';
    import store from './store';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    ```






- 注重看Provider和Provider

  





### 1.2. redux中进行异步操作(重要) -- redux-thunk 和 applyMiddleWare

- 因为dispatch action是个同步操作,要是进行异步操作数据,action可能接受不到数据

- 而且dispatch()只能是对象如{type:"increase",num:18} , 不可以是函数
  - 正常情况: store.dispatch(object)不可以store.dispatch(function),redux不支持
  
- 以及 网络请求那些异步操作放在组件之外(即actionCreators.js)处理

- 解决

  - 注重看redux-thunk 与 applyMiddleWare(thunk) ----- 使得dispatch可以传递函数
    - npm install redux-thunk 
  - 函数中发送异步请求
    - dispatch()

  ```
  UseThunk.js
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import { fetchMultiDataAction } from '../store/actionCreators'
  
  export class useThunk extends Component {
    componentDidMount() {
      this.props.fetchMultiData()
    }
    render() {
      return (
        <div>
          <h2>useThunk: {this.props.counter}</h2>
        </div>
      )
    }
  }
  
  
  const mapStateToProps = (state) => ({
    counter: state.counter
  })
  
  const mapDispatchToProps = (dispatch) => ({
    fetchMultiData: () => dispatch(fetchMultiDataAction())
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(useThunk)
  ```

- ```
  store/index.js中
  import { createStore,applyMiddleware } from "redux"
  import reducer from "./reducer"
  import { thunk } from "redux-thunk"
  const store = createStore(reducer,applyMiddleware(thunk))
  export default store
  
  ```

- ```
  actionCreators.js
  import * as actionTypes from "./constants"
  import axios from "axios"
  
  export const changeRecommendsAction = (recommends) => ({
    type: actionTypes.CHANGE_RECOMMENDS,
    recommends
  })
  
  export const fetchMultiDataAction = () => {
    return (dispatch, getState) => {
      axios.get("http://123.207.32.32:8000/home/multidata").then(res=>{
        const banners = res.data.data.banner.list
        const recommends = res.data.data.recommend.list
        dispatch(changeBannersAction(banners))
        dispatch(changeRecommendsAction(recommends))
      })
    }
  }
  ```

  

### 1.3. redux-devtools

- 谷歌安装 redux-devtools 插件

  ```
  开放模式开启
  import { createStore,applyMiddleware,compose } from "redux"
  const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
  const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
  
  发展模式
  import { createStore,applyMiddleware} from "redux"
  const store = createStore(reducer,applyMiddleware(thunk))
  
  ```

  



### 1.4. rducer的拆分过程(重要) -- combineReducers

因为多人开放:不要轻易改变别人的代码

- combineReducers({ counter:counterReducer, home: homeReducer})
- 原理: function reducer(state = {}, action) { return {}}

```
import { createStore,applyMiddleware,compose, combineReducers } from "redux"
import reducer from "./reducer"
import { thunk } from "redux-thunk"
import divAddReducer from "./divAdd/reducer"
import divSubReducer from "./divSub/reducer"

// const reducer = combineReducers({
//   divAdd: divAddReducer,
//   divSub: divSubReducer
// })
//大致原理, combineReducers还对后面参数action进行了逻辑判断,而不是所有传进来的都返回一个对象
function reducer(state ={}, action) {
  return {
    divAdd: divAddReducer(state.divAdd, action),//每次调用就执行
    divSub: divSubReducer(state.divSub, action)//一样
  }
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store
```

- 组件中

  ```
  import { incrementAction } from "../divStore/divAdd/index.js"
  导入依旧是划分组件后的文件中,而不是总体那个index.js文件
  
  export class useConnect extends Component {
    addNum(num, isAdd) {
      if (isAdd) {
        this.props.incrementAction(num)
      } 
    }
    render() {
      return (
        <div>
          <h2>{this.props.counter}</h2>
          <button onClick={()=>this.addNum(6, true)}>+6</button>
          <button onClick={()=>this.addNum(6, false)}>-6</button>
        </div>
      )
    }
  }
  ```

  



# 二. ReduxToolKit(重要)

### 2.1. RTK介绍 --- 组件代码不变,只对逻辑代码(比如那四个文件)

- 因为redux的编写逻辑繁琐,代码拆分在多个文件中,但可以放一个,但代码量大
- RTK旨在编写Redux逻辑的标准方式,从而解决上面的问题
- 安装
  - npm install @reduxjs/toolkit react-redux
    - 依赖react-redux





### 2.2.RTK基本使用(重要) -- 三个核心

- 核心一: configureStore: reducer

  ```
  index.js中
  
  import { configureStore } from "@reduxjs/toolkit";
  import counterReducer from "./features/counter";
  import fetchMutilDate from "./features/fetchMutilDate";
  
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      fetchMutilDate: fetchMutilDate,
    },
  });
  
  export default store;
  ```

  

- 核心二: createSlice:
  - name :标记slice
    - 在浏览器使用插件redux-devtool时会出现对应的标识符
  - initialState : 初始值
  - reducers: {}: 相当于之前的reducer函数
    - 参数一: state
    - 参数二: 调用这个action时, 传递的action参数

  -  createSlice返回值是一个对象,包含所有的actions

  - 相关代码

    - ```
      import { createSlice } from "@reduxjs/toolkit";
      
      const counterSlice = createSlice({
        name: 'counter',
        initialState: {    
          count: 0
        },
        reducers: {
          incrementAction(state, { payload }) { 
            state.count += payload;
          },
          decrementAction(state, { payload }) {
            state.count -= payload;
          }
        }
      })
      
      export const { incrementAction, decrementAction } = counterSlice.actions;
      export default counterSlice.reducer;
      ```

    - 问题

      ```
      在 counter.js 中，state 结构是：{ count: 0 }
      在 Redux store 中，这个 reducer 被注册为：counter: counterReducer
      所以完整的 state 结构是：{ counter: { count: 0 } }
      组件中使用要 counter: state.counter.count 而没有多一个counter会报错
      ```

      





### 2.3. RTK异步操作(重要)

- 核心三: 

- const asyncAction = createAsyncTAhunk('actionName', async () => {}) 

- 三种状态:
  - pending
  - fulfilled
  - rejected

- extraReducers:(builder) => {builder.addCase()} ()

  ```
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from 'axios'
  
  export const fetchMutilDataAction = createAsyncThunk('fetchMutilDataAction', async () => {
    const res = await axios.get('http://123.207.32.32:8000/home/multidata')
    return res.data: 不加data会报错
  }) // 第一个参数是action的名称，第二个参数是异步请求的函数
  
  const fetchMutilDataSlice = createSlice({
    name: 'fetchMutilData',
    initialState: {    
      banners: [],
      recommends: []
    },
    reducers: {
      fetchBannersAction(state, { payload }) {
        state.banners = payload;
      },
      fetchRecommendsAction(state, { payload }) {
        state.recommends = payload;
      }
    },
    //方式一
    extraReducers: (builder) => {
      builder
        .addCase(fetchMutilDataAction.pending, (state, action) => {
          console.log("pending")
        })
        .addCase(fetchMutilDataAction.fulfilled, (state, action) => {
          console.log("fulfilled")
          state.banners = action.payload.data.banner.list;
          state.recommends = action.payload.data.recommend.list;
        })
        .addCase(fetchMutilDataAction.rejected, (state, action) => {
          console.log("rejected")
        })
    }
    
    //这个方法不可以了,使用就会报错,因为库里面把相关代码删除了
    // extraReducers: {
    //   [fetchMutilDataAction.pending]: (state, { payload }) => {
    //     console.log("pending")
    //   },
    //   [fetchMutilDataAction.fulfilled]: (state, { payload }) => {
    //     console.log("fulfilled")
    //     state.banners = payload.data.banner.list;
    //     state.recommends = payload.data.recommend.list;
    //   },
    //   [fetchMutilDataAction.rejected]: (state, { payload }) => {
    //     console.log("rejected")
    //   }
    // }
  })
  
  export const { fetchBannersAction, fetchRecommendsAction } = fetchMutilDataSlice.actions;
  export default fetchMutilDataSlice.reducer;
  ```

  





### 2.4.异步处理方式二

- createAsyncThunk("name", aysnc(extraInfo, store) => {})

  ```
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from 'axios'
  
  export const fetchMutilDataAction = createAsyncThunk('fetchMutilDataAction', 
   async (extraInfo, { dispatch, getState} ) => {
    const res = await axios.get('http://123.207.32.32:8000/home/multidata')
    // return res.data
  
    //方式二: 拿到数据直接就地获取与处理,不用 extraReducers
    const banners = res.data.banner.list;
    const recommends = res.data.data.recommend.list;
    dispatch(fetchBannersAction(banners));
    dispatch(fetchRecommendsAction(recommends));
  
  }) // 第一个参数是action的名称，第二个参数是异步请求的函数
  
  const fetchMutilDataSlice = createSlice({
    name: 'fetchMutilData',
    initialState: {    
      banners: [],
      recommends: []
    },
    reducers: {
      fetchBannersAction(state, { payload }) {
        state.banners = payload;
      },
      fetchRecommendsAction(state, { payload }) {
        state.recommends = payload;
      }
    }
  })
  
  export const { fetchBannersAction, fetchRecommendsAction } = fetchMutilDataSlice.actions;
  export default fetchMutilDataSlice.reducer;
  ```

  



### 2.5.RTK的数据不可变性

- 由于之前的数据都是进行浅拷贝的形式对比
  - 缺点: 大的对象都复制,则容易造成性能的浪费
- 新的算法: Persistent Data Structure
  - 用一种数据结构保持数据
  - 当数据被修改时,放回一个新对象,但新的对象会尽量使用之前的数据而不会对内存找出浪费





# 三.connect底层原理(了解)

### 3.1. connect的实现

```
原理文件夹中的index
import { PureComponent } from "react";
import { StoreContext } from "./StoreContext";

// connect原理: 本质就是高阶组件
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrapperComponent) {
    class NewComponent extends PureComponent {
      static contextType = StoreContext;

      constructor(props) {
        super(props);
        // 在 constructor 中不能访问 this.context，所以设置空状态
        this.state = {};
      }

      componentDidMount() {
        // 在 componentDidMount 中，this.context 已经可用
        this.setState(mapStateToProps(this.context.getState()));
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState()));
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const stateObj = mapStateToProps(this.context.getState()); 
        const dispatchObj = mapDispatchToProps(this.context.dispatch);
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />
      }
    }
    return NewComponent;
  }
}


```





### 3.2. store的解耦操作

- StoreContext

  - ```
    index.js
    export { StoreContext } from "./StoreContext";
    export { default as connect } from "./connect";
    ```

  - ```
    StoreContext.js
    import { createContext } from "react";
    export const StoreContext = createContext();
    ```

  - ```
    主文件的index.js
    import { Provider } from 'react-redux';
    import { StoreContext } from './hoc';
    import store from './store';
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      // <React.StrictMode>
      <Provider store={store}> 
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </Provider>
      // </React.StrictMode>
    );
    
    
    ```

    