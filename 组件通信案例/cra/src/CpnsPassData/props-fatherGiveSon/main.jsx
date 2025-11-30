import React, { Component } from 'react'
// 大写开头
import MainList from './mainList'

export class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: 123,
      // banners: ["大展宏图",'因果',"来财"],
    }
  }
  render() {
    return (
      <div>
        <div>main</div>     
        <MainList banners={this.state.banners} title={this.state.title} />
      </div>
    )
  }
}

// 正确的PropTypes定义方式
export default main
