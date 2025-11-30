import React, { Component } from 'react'
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
