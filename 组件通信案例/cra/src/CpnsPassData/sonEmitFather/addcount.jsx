import React, { Component } from 'react'

export class addcount extends Component {
  addCount(e){
    this.props.addClick(e)
  }
  render() {
    return (
      <div>
        <button onClick={e=>this.addCount(1)}>+1</button>
        <button onClick={e=>this.addCount(5)}>+5</button>
      </div>
    )
  }
}

export default addcount
