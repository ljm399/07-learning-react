import React, { Component } from 'react'
import { HYRouter } from '../hoc'

export class Songmenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songmenu: [
        { id: 1, name: '《爱你不是两三天》' },
        { id: 2, name: '《后来》' },
        { id: 3, name: '《十年》' },
      ]
    }
  }
  NavigateToDetail(id) {
    const { navigate } = this.props.router
    // 修复：使用绝对路径
    navigate("/home/songdetail/" + id)
  }

  render() {
    const { songmenu } = this.state
    return (
      <div>
        <h2>歌单</h2>
        <ul>  
          {
            songmenu.map((item) => {
              return <li key={item.id} onClick={e => this.NavigateToDetail(item.id)}>{item.name}</li>
          })
        }
        </ul>
      </div>
    )
  }
}

export default HYRouter(Songmenu)
