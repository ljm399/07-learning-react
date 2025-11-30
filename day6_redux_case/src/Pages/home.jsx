import React, { PureComponent } from 'react'

export class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      counter: props.counter
    }
  }
  decrement(num) {
    this.props.decrement(num)
  }
  render() {
    const {counter} = this.props
    return (
      <div>
        <h1>Home Counter: {counter}</h1>
        <button onClick={() => this.decrement(1)}>-1</button>
        <button onClick={() => this.decrement(4)}>-4</button> 
        <button onClick={() => this.decrement(20)}>-20</button>
      </div>
    )
  }
}

export default Home
