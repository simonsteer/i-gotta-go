import React from 'react'
import axios from 'axios'
import store from '../store'
import { connect } from 'react-redux'

import Loading from './loading'
import { draw } from '../graph/draw'

import { getCryptoHistory } from '../actions/get-crypto-history'
import { getUser } from '../actions/get-user'

const cc = require('cryptocompare')

@connect(
  (store => {
    return {
      user: store.user,
      history: store.history,
      coins: store.coinlist
    }
  })
)
export default class Graph extends React.Component {

  constructor() {
    super()
    this.state = {
      increments: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    }
  }

  getCryptoHistory(period, ticker, currency) {
    this.props.dispatch(getCryptoHistory(period, ticker, currency)).then(() => {
      cc.priceFull(ticker, currency).then(response => {
        this.props.dispatch(getUser({
          currency,
          lastQueried: {
            ticker,
            currency,
            period,
            marketCap: response[ticker][currency].MKTCAP
          }
        }))
      })
    })
  }
  
  componentDidMount() {

    const dbRef = firebase.database().ref(`users/${this.props.user.id}/currency`)
    dbRef.on('value', snapshot => {
      const currency = snapshot.val()
      const { period, ticker } = this.props.user.lastQueried
      const watchlist = this.props.user.watchlist
      
      if (watchlist === undefined || watchlist === null) {
        this.getCryptoHistory('year', 'BTC', currency)
        return
      }
      this.getCryptoHistory(period, ticker, currency)
    })
  }

  componentDidUpdate() {
    const { list: history } = this.props.history
    const { theme, currency } = this.props.user
    const dataToPlot = history.map(date => {
      return date.close
    })
    if (history.length > 0) {

      const canvas = document.querySelector('.graph')

      let drawcolor
      if (theme === 'black') {
        drawcolor = 'rgb(239, 239, 239)'
      } else {
        drawcolor = 'rgb(166, 166, 166)'
      }
      draw(dataToPlot, history, drawcolor, currency)

      window.removeEventListener('resize', () => draw(dataToPlot, history, drawcolor, currency), true)
      window.addEventListener('resize', () => draw(dataToPlot, history, drawcolor, currency), true)
      
    }
  }
  
  render() {

    const { ticker, currency, period } = this.props.user.lastQueried

    let date = new Date()
    let n = date.getMonth()
    let increments = this.state.increments.months
    let first
    let second

    switch (period) {
      case 'week':
        increments = this.state.increments.days
        n = date.getDay();
        first = increments.slice(n, increments.length)
        second = increments.slice(0, n)
        increments = first.concat(second)
        console.log(increments)
        break;
      case '3 months':
        first = increments.slice(n + 1, increments.length)
        second = increments.slice(0, n + 1)
        increments = increments.slice(9)
        break;
      case '6 months':
        first = increments.slice(n + 1, increments.length)
        second = increments.slice(0, n + 1)
        increments = increments.slice(6)
        break;
      case 'year':
        first = increments.slice(n, increments.length)
        second = increments.slice(0, n)
        increments = first.concat(second)
        break;
    }

    return (
      <div className="graph-container">
      {this.props.history.fetching
        ?
          <Loading />
        :
          <section className="graph">
            <div className="graph__marker">
              <div className="graph__dot">
                <h3 className="graph__header">dd/mm/yyyy: $0.00</h3>
              </div>
            </div>
            <ul className="graph__time-increment">
              {increments.map(inc => <li key={inc}>{inc}</li>)}
            </ul>
            <canvas id="canvas">
            </canvas>
            <ul className="graph__time-options">
              <li
                className={period === 'week' ? 'time-option__active' : ''}
                onClick={() => this.getCryptoHistory('week', ticker, currency)}>1 Week</li>
              <li
                className={period === '3 months' ? 'time-option__active' : ''}
                onClick={() => this.getCryptoHistory('3 months', ticker, currency)}>3 Months</li>
              <li
                className={period === '6 months' ? 'time-option__active' : ''}
                onClick={() => this.getCryptoHistory('6 months', ticker, currency)}>6 Months</li>
              <li
                className={period === 'year' ? 'time-option__active' : ''}
                onClick={() => this.getCryptoHistory('year', ticker, currency)}>1 Year</li>
            </ul>
          </section>
      }
      </div>
    )
  }
}