import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { connect } from '../hoc'
import { incrementAction } from "../store/features/counter"

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

const mapStateToProps = (state) => ({
  counter: state.counter.count
})

const mapDispatchToProps = (dispatch) => {
  return {
    incrementAction: (num) => dispatch(incrementAction(num)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(useConnect)
