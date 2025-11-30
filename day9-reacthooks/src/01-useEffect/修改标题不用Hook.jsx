import React, { Component } from 'react'

export class APP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    document.title = this.state.count
  }
  componentDidUpdate() {
    document.title = this.state.count
  }

  render() {
    const {count} = this.state
    return (
      <div>
        <h1>count: {count}</h1>
        <button onClick={() => this.setState({count: count + 1})}>+</button>
      </div>
    )
  }
}

export default APP
