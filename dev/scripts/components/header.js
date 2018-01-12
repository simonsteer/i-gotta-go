import React from 'react'

import { connect } from 'react-redux'

import store from '../store'
import { getUser } from '../actions/get-user'

import Settings from './settings'

@connect(
  (store => {
    return {
      history: store.history,
      coinlist: store.coinlist,
      user: store.user,
    }
  })
)
export default class Header extends React.Component {
  
  constructor() {
    super()
    this.state = {
      showSettings: false
    }
    this.toggleSettingsPanel = this.toggleSettingsPanel.bind(this)
    this.settingsClickOut = this.settingsClickOut.bind(this)
  }

  toggleSettingsPanel() {
    this.setState({showSettings: !this.state.showSettings})
  }

  settingsClickOut(e) {

    if (e.target.className === 'header__settings-button') return

    const settings = document.querySelector('.settings')
    const header = document.querySelector('header')
    
    if (settings === null) return

    const
      startX = settings.offsetLeft,
      endX = settings.offsetLeft + settings.clientWidth,
      startY = settings.offsetTop,
      endY = settings.offsetTop + settings.clientHeight
    
    const leave =
      e.clientX < startX ||
      e.clientX > endX ||
      e.clientY < startY ||
      e.clientY > endY

    console.log(leave)

    if (leave && e.target.className !== 'currency-list__item') this.toggleSettingsPanel()    

  }

  componentDidMount() {
    const theme = firebase.database().ref(`users/${this.props.user.id}/theme`)
    theme.on('value', snapshot => {
      this.props.dispatch(getUser({ theme: snapshot.val() }))
    })
    window.addEventListener('click', this.settingsClickOut, true)
  }

  render() {

    const { ticker, marketCap, currency } = this.props.user.lastQueried
    document.querySelector('link').setAttribute('href', `public/styles/style-${this.props.user.theme}.css`)

    return (
      <header>
        <h1 className="header__title">Cry-Baby</h1>
        <span className="header__market-cap">
          {ticker} Market Cap: {marketCap.toFixed(2)} {currency}
        </span>
        <button
          className="header__settings-button"
          onClick={this.toggleSettingsPanel}
        >
          {this.state.showSettings ? 'Close' : 'Settings' }
        </button>
        {this.state.showSettings ? <Settings /> : null}
      </header>
    )
  }
}