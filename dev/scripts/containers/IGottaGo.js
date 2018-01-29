import React from 'react'
import { connect } from 'react-redux'

global.fetch = require('node-fetch')
import scrollToComponent from 'react-scroll-to-component';

import Header from '../components/Header'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

import getRestrooms from '../actions/get-restrooms'
import LoadingScreen from '../components/LoadingScreen';

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
      unisex: false,
      getting: false,
      address: ''
    }
    this.ada = this.ada.bind(this)
    this.unisex = this.unisex.bind(this)
    this.getRestrooms = this.getRestrooms.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
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

  updateAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  getLocation(address) {
    const { dispatch } = this.props
    const geocoder = new google.maps.Geocoder();

    this.setState({ getting: true }, () => {

      geocoder.geocode({ address }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {

          const lat = results[0].geometry.location.lat()
          const lng = results[0].geometry.location.lng()

          this.setState({
            lat,
            lng,
            address: '',
            getting: false
          }, () => {
            const { lat, lng, ada, unisex } = this.state
            dispatch(getRestrooms(lat, lng, ada, unisex)).then(() => {
              scrollToComponent(this.Results, { duration: 1000 })
            })
          })

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }

      })
    })
  }

  getRestrooms(e) {
    e.preventDefault()
    this.getLocation(this.state.address)
  }

  render() {

    const { fetching, fetched, data } = this.props.restrooms
    const { getting } = this.state

    return (
      <React.Fragment>
        <Header />
        {fetching || getting
          ?
          <LoadingScreen />
          :
          <React.Fragment>
            <SearchForm
              toggleAda={this.ada}
              ada={this.state.ada}
              toggleUnisex={this.unisex}
              unisex={this.state.unisex}
              getRestrooms={this.getRestrooms}
              address={this.state.address}
              updateAddress={this.updateAddress}
            />
            <div style={{ visibility: 'hidden' }} ref={div => { this.Results = div; }}></div>
            <SearchResults restrooms={data} />
          </React.Fragment>}
      </React.Fragment>
    )
  }
}