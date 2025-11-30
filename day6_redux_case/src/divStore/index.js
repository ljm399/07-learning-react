import { createStore,compose } from "redux"
import divAddReducer from "./divAdd/reducer"
import divSubReducer from "./divSub/reducer"
import { log, thunk } from "../middleware"
import applyMiddleware from "../middleware/applyMiddleWare"

// const reducer = combineReducers({
//   divAdd: divAddReducer,
//   divSub: divSubReducer
// })
//原理
function reducer(state ={}, action) {
  return {
    divAdd: divAddReducer(state.divAdd, action),
    divSub: divSubReducer(state.divSub, action)
  }
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(log, thunk)))

//使用中间件,实现日志打印
// function log(store) {
//   const next = store.dispatch
//   function logAndDispatch(action) {
//     console.log("当前派发的action", action)
//     //真正派发的代码,用之前的Dispatch进行派发
//     next(action)
//     console.log("派发之后的state", store.getState())
//   }

//   store.dispatch = logAndDispatch
// }

// 调用log函数来应用日志中间件
// log(store)

// // 手动实现thunk中间件
// function thunkMiddleware(store) {
// 	const next = store.dispatch
// 	function dispatchThunk(action) {
// 		if(typeof action === "function") {
// 			action(store.dispatch, store.getState())  // 注意这里需要调用 getState()
// 		} else {
// 			next(action)
// 		}
// 	}
// 	store.dispatch = dispatchThunk
// }

// 应用中间件的顺序很重要：先应用thunk，再应用log
// thunkMiddleware(store)

applyMiddleware(store, log, thunk)

export default store