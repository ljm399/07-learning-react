import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class mainList extends Component {
  render() {
    const {banners,title} = this.props
    return (
      <div>
        <h3>banner:{title}</h3>
        <ul>
          {
            banners.map((item,index)=>{
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

// 在组件类内部定义propTypes
mainList.propTypes = {
  banners: PropTypes.array, 
  // title: PropTypes.fnc,报错若是array,string则不报错
}

mainList.defaultProps = {
  banners: ['默认banner1', '默认banner2', '默认banner3'],
  title: '默认标题',
}

export default mainList
