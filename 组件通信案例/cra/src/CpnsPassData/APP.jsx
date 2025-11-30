import React, { Component } from 'react'
import Main from './props-fatherGiveSon/main'
import Count from './sonEmitFather/count'

export class APP extends Component {
  render() {
    return (
      <div>
        <h3>父传子</h3>
        <Main />
        <h3>子传父</h3>
        <Count />

      </div>
    )
  }
}

export default APP
