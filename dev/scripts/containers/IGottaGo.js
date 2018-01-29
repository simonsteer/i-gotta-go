import React from 'react'
import { connect } from 'react-redux'

global.fetch = require('node-fetch')

import Header from '../components/Header'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

import getRestrooms from '../actions/get-restrooms'

@connect(state => {
  const { restrooms } = state
  return {
    restrooms
  }
})
export default class IGottaGo extends React.Component {

  constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0,
      ada: false,
      unisex: false
    }
    this.ada = this.ada.bind(this)
    this.unisex = this.unisex.bind(this)
    this.getRestrooms = this.getRestrooms.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  ada() {
    this.setState({
      ada: !this.state.ada
    })
  }

  unisex() {
    this.setState({
      unisex: !this.state.unisex
    })
  }

  getLocation(callback) {
    const { dispatch } = this.props
    console.log('getting location')

    navigator.geolocation.getCurrentPosition(position => {
      console.log('location obtained')
      const { latitude: lat, longitude: lng } = position.coords
      this.setState({
        lat,
        lng
      }, () => {
        const { lat, lng, ada, unisex } = this.state
        dispatch(getRestrooms(lat, lng, ada, unisex))
      })
    })
  }

  getRestrooms(e) {
    e.preventDefault()
    this.getLocation()
  }

  render() {

    const { fetching, fetched, data } = this.props.restrooms

    return (
      <React.Fragment>
        <Header />
        {!fetched
        ?
        <SearchForm
          toggleAda={this.ada}
          ada={this.state.ada}
          toggleUnisex={this.unisex}
          unisex={this.state.unisex}
          getRestrooms={this.getRestrooms}
        />
        :
        <SearchResults restrooms={data} />}
      </React.Fragment>
    )
  }
}