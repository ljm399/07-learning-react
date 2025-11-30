function log(store) {
  // 1. 保存原始的 dispatch 函数
  const next = store.dispatch
  
  // 2. 定义新的 dispatch 函数，增加日志功能
  function logAndDispatch(action) {
    // 3. 在 action 派发前打印日志
    console.log("当前派发的action", action)
    
    // 4. 调用原始的 dispatch 来执行真正的 action
    next(action)
    
    // 5. 在 action 派发后打印新的 state
    console.log("派发之后的state", store.getState())
  }

  // 6. 用新的 dispatch 函数替换原始的 dispatch
  store.dispatch = logAndDispatch
}

export default log