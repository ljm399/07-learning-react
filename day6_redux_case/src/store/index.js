import { createStore,applyMiddleware,compose } from "redux"
import reducer from "./reducer"
import { thunk } from "redux-thunk"
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store