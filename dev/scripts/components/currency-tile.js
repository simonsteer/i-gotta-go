import axios from 'axios'
import React from 'react'
import { Route } from 'react-router-dom'

import { AddToListButton, RemoveFromListButton } from './buttons'

import { connect } from 'react-redux'

import { getCryptoHistory } from '../actions/get-crypto-history'
import { getUser } from '../actions/get-user'

const cc = require('cryptocompare')

@connect(store => {
  return {
    history: store.history,
    user: store.user
  }
})
export default class CurrencyTile extends React.Component {
  
  getCryptoHistory(e) {

    if (window.location.pathname !== '/search' && e.target.className !== 'currencies-tracked__remove-button') {
      this.props.dispatch(getCryptoHistory('year', this.props.ticker, this.props.user.currency))

      cc.priceFull(this.props.ticker, this.props.user.currency).then(response => {
  
        const { ticker } = this.props
        const { currency } = this.props.user

        console.log(response, ticker, currency)
        
        this.props.dispatch(getUser({
          lastQueried: {
            ticker,
            period: this.props.user.lastQueried.period,
            currency,
            marketCap: response[ticker][currency].MKTCAP
          }
        }))
      })
    }
  }
  
  render() {
    return (
      <li
        className="currency-tile"
        onClick={this.getCryptoHistory.bind(this)}
      >
      <div>
        <h3 className="currency-tile--currency">
          {this.props.ticker}
        </h3>
        <div className="currency-tile--currency-info">
          <span className="currency-tile__span">
            {this.props.name}
          </span>
            <span className="currency-tile__span">{`${this.props.price} ${this.props.user.currency}`}</span>
        </div>
      </div>
        <Route path="/search" render={props => <AddToListButton {...props} ticker={this.props.ticker} name={this.props.name} />} />
        {this.props.parent === 'CurrenciesTracked'
          ?
          <RemoveFromListButton id={this.props.id} />
          :
          null
        }
      </li>
    )
  }
}