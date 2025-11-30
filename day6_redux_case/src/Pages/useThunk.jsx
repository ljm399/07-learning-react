import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMultiDataAction } from '../store/actionCreators'

export class useThunk extends Component {
  componentDidMount() {
    this.props.fetchMultiData()
  }
  render() {
    return (
      <div>
        <h2>useThunk: {this.props.counter}</h2>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  fetchMultiData: () => dispatch(fetchMultiDataAction())
})

export default connect(mapStateToProps,mapDispatchToProps)(useThunk)
