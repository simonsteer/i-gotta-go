import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './login'
import Header from './header'
import CurrenciesTracked from './currencies-tracked'
import Search from './search'
import NewsFeed from './news-feed'
import Graph from './graph'

global.fetch = require('node-fetch')

@connect(
  (store => {
    return {
      user: store.user,
      history: store.history,
      coins: store.coinlist
    }
  })
)
export default class CryBaby extends React.Component {
  render() {
    return (
      <Router>
        {this.props.user.id
        ?
        <div className="layout">
          <Header />
          <CurrenciesTracked />
          <div className="currency-info">
          <Route path="/search" component={Search} />
          <Route exact path="/" component={Graph} />
          <Route exact path="/" component={NewsFeed} />
          </div>
        </div>
        :
        <Login />
        }
      </Router>
    )
  }
}