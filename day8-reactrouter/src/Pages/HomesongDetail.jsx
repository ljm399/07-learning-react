import React, { Component } from 'react'
import { HYRouter } from '../hoc'

export class HomesongDetail extends Component {
  render() {
    const { router } = this.props
    const { params } = router
    return (
      <div>
        <h2>歌曲详情</h2>
        <h3>id: {params.id}</h3>
      </div>
    )
  }
}

export default HYRouter(HomesongDetail)
