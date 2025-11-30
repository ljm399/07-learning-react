import React, { Component } from 'react'

export class addcount extends Component {
  subCount(e){
    this.props.subClick(e)
  }
  render() {
    return (
      <div>
        <button onClick={e=>this.subCount(-1)}>-1</button>
        <button onClick={e=>this.subCount(-5)}>-5</button>
      </div>
    )
  }
}

export default addcount
