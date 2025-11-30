import React, { Component } from 'react'
import './style.css'

export class index extends Component {
  handleClick(index) {
    this.props.onChange(index)
    this.props.onContent(index)
  }
  render() {
    const { titles, currentIndex, tabIndex } = this.props
    return (
      <div className='tab-control'>
        {
          titles.map((item, index) => {
            return (
              <div key={index} className={`item ${index === currentIndex ? 'active' : ''}`} onClick={() => this.handleClick(index)}>
                {item}

                {/* {方式一:渲染具体内容} */}
                {/* {item}里面不能直接ifelse,但可以三元运算符 */}
                {/* {index === currentIndex && <h3>{item}</h3>} */}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default index
