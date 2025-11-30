// 手动实现thunk中间件
function thunkMiddleware(store) {
	const next = store.dispatch
	function dispatchThunk(action) {
		if(typeof action === "function") {
			action(store.dispatch, store.getState())  // 注意这里需要调用 getState()
		} else {
			next(action)
		}
	}
	store.dispatch = dispatchThunk
}

export default thunkMiddleware