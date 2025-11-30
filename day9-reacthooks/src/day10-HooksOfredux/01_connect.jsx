import { incrementAction, decrementAction } from "./store/modules/counter";
import { connect } from "react-redux";
import { memo } from "react";

const App = memo((props) => {
  const { count, increment, decrement } = props
  function addNumberHandler(num, isAdd = true) {
    if (isAdd) {
      increment(num)
    } else {
      decrement(num)
    }
  }
  return (
    <div>
      <h2>当前计数：{count}</h2>
      <button onClick={() => addNumberHandler(1)}>+1</button>
      <button onClick={() => addNumberHandler(1, false)}>-1</button>
      <button onClick={() => addNumberHandler(5)}>+5</button>
      <button onClick={() => addNumberHandler(5, false)}>-5</button>
    </div>
  )
})

const mapStateToProps = (state) => {
  return {
    count: state.counter.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (num) => dispatch(incrementAction(num)),
    decrement: (num) => dispatch(decrementAction(num))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)