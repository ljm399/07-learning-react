import React, { PureComponent } from 'react'
import Home from './Pages/home'
import About from './Pages/about'
import './App.css'
import store from "./store"
import { decrementAction } from './store/actionCreators'
import UseConnect from './Pages/useConnect'
import UseThunk from './Pages/useThunk'
import DivAdd from './Pages/divAdd'
import DivSub from './Pages/divSub'


export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      counter: store.getState().counter
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({counter: state.counter})
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
        <div className='App'>
        <Home counter={counter} decrement={this.decrement}/> 
        <About counter={counter}/>

        <h3>-------UseConnect右边----</h3>
        <UseConnect/>

        <h3>----UseThunk右边----</h3>
        <UseThunk/>
        </div>
        <h3>-------划分reducer----</h3>
        <DivAdd/>
        <DivSub/>
      </div>
    )
  }
}

export default App
