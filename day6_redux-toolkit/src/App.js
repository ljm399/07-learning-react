import React, { PureComponent } from 'react'
import './App.css'
import DivAdd from './Pages/divAdd'
import DivSub from './Pages/divSub'
import store from './store'
import { decrementAction } from './store/features/counter'


export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      counter: store.getState().counter.count
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({counter: state.counter.count})
    })
  }

  decrement = (num) => {
    store.dispatch(decrementAction(num))
  }

  render() {
    const {counter} = this.state
    return (
      <div>
        <h1>App Counter: {counter}</h1>
        <DivAdd/>
        <DivSub/>
      </div>
    )
  }
}

export default App
