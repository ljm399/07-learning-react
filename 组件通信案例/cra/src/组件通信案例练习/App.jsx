import React, { Component } from 'react'
import Index from './tabControl/index'

export class APP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      titles: ['流行', '新款', '精选'],
      tabIndex: 0
    }
  }

  handleChange(index) {
    this.setState({
      currentIndex: index
    })
  }

  handleContentChange(e) {
    this.setState({
      tabIndex: e
    })
  }
  render() {
    const { currentIndex, titles, tabIndex } = this.state
    return (
      <div>
        {/* {不能直接onChange={this.handleChange}，需要this} */}
        <Index titles={titles} currentIndex={currentIndex} onChange={e=>this.handleChange(e)} onContent={e=>this.handleContentChange(e)}/>    
        {/* 方式二 */}
        {/* <h2>{titles[currentIndex]}</h2> */}
        {/* {方式} */}
        <h2>{titles[tabIndex]}</h2>
      </div>
    )
  }
}


export default APP
