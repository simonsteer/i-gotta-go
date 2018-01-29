import React from 'react'
import { connect } from 'react-redux'

@connect(state => {
  return {
    axios: state.axios,
    basic: state.basic
  }
})
export default class Main extends React.Component {
  render() {
    console.log(this.props)
    return (
      <h1>Hello World!</h1>
    )
  }
}