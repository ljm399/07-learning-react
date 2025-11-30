import React from 'react'
import ReactDOM from 'react-dom/client'
// import { UserContext, ThemeContext } from './02-useContext/context'
import { UserContext, TokenContext } from './09-customHooks/context'

// import APP from './01-useEffect/APP'
// import APP from "./02-useContext/APP"
// import APP from "./03-useReducer/APP"
// import APP from "./04-useCallback/APP"
// import APP from "./05-useMemo/APP"
// import APP from './06-useRef/APP'
// import APP from './07-useImperativeHandle/APP'
// import APP from './08-useLayoutEffect/APP'
// import APP from './09-customHooks/APP'
// import APP from './day10-HooksOfredux/APP'
import { Provider } from 'react-redux'
import store from './day10-HooksOfredux/store'
import APP from './day10-useTranstionAnduseDeferredValue/APP'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContext.Provider value={{name: 'codecao', age: 18}}>
    <TokenContext.Provider value={{token: '1234567890'}}>
      <Provider store={store}>
        <APP />
      </Provider>
    </TokenContext.Provider>
  </UserContext.Provider>
)