import React, { PureComponent } from 'react'
import store from "../store"
import { incrementAction } from "../store/actionCreators"

export class About extends PureComponent {
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

  render() {
    const {counter} = this.state
    return (
      <div>
        <h1>About Counter: {counter}</h1>
        <button onClick={() => this.increment(1)}>+1</button>
        <button onClick={() => this.increment(4)}>+4</button>
        <button onClick={() => this.increment(20)}>+20</button>
      </div>
    )
  }
}

export default About
