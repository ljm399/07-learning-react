import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decrementAction } from "../store/features/counter"

export class useConnect extends Component {
  subNum(num) {
    this.props.decrementAction(num)
  }
  render() {
    return (
      <div>
        <h2>divSub: {this.props.counter}</h2>
        <button onClick={()=>this.subNum(6)}>-6</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.count
})

const mapDispatchToProps = (dispatch) => {
  return {
    decrementAction: (num) => dispatch(decrementAction(num)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(useConnect)
