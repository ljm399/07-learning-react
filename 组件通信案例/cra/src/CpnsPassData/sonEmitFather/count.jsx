import React, { Component } from 'react'
import AddCount from './addcount'
import SubCount from './subcount'

export class Count extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  AddCount(e){
    this.setState({
      count: this.state.count + e
    })
  }
  SubCount(e){
    this.setState({
      count: this.state.count - e
    })
  }
  render() {
    const {count} = this.state
    return (
      <div>
        <h2>count:{count}</h2>
        <AddCount addClick={e=>this.AddCount(e)} />
        <SubCount subClick={e=>this.SubCount(-e)} />  
      </div>
    )
  }
}

export default Count
