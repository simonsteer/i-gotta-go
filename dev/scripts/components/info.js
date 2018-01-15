import React from 'react'
import { Route } from 'react-router-dom'

import Graph from './graph'
import NewsFeed from './news-feed'
import Search from './search'
import Portfolio from './portfolio'

export default class Info extends React.Component {
  constructor() {
    super()
    this.state = {
      isMobile: false,
      panel: 0
    }
    this.checkIfMobileView = this.checkIfMobileView.bind(this)
    this.changePanel = this.changePanel.bind(this)
  }

  checkIfMobileView() {
    if (window.innerWidth <= 650 && !this.state.isMobile) {
      this.setState({
        isMobile: true
      })
    } else if (window.innerWidth > 650 && this.state.isMobile) {
      this.setState({
        isMobile: false,
        panel: 1
      })
    }
  }

  changePanel(n) {
    this.setState({
      panel: n
    })
  }

  componentDidMount() {
    if (window.innerWidth <= 650) {
      this.setState({
        isMobile: true
      })
    } else {
      this.setState({
        panel: 1
      })
    }
    window.addEventListener('resize', this.checkIfMobileView)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIfMobileView)
  }

  render() {
    const { isMobile, panel } = this.state

    return (
      <div className="currency-info">
        <Route path="/search" component={Search} />
        {window.location.pathname === '/' && !isMobile ? <Graph /> : null}
        {window.location.pathname === '/' && isMobile && panel === 0 ? <Graph /> : null}
        {window.location.pathname === '/' && panel === 1 ? <Portfolio /> : null }
        {window.location.pathname === '/' && panel === 2 ? <NewsFeed /> : null }
        {window.location.pathname === '/'
          ?
          <ul className="panel-selector">
            {isMobile
              ?
              <li
                className={panel === 0 ? 'panel-active' : ''}
                onClick={() => this.changePanel(0)}>
                Graph
            </li>
              :
              null
            }
            <li
              className={panel === 1 ? 'panel-active' : ''}
              onClick={() => this.changePanel(1)}>
              Portfolio
          </li>
            <li
              className={panel === 2 ? 'panel-active' : ''}
              onClick={() => this.changePanel(2)}>
              News
          </li>
          </ul>
          :
          null
        }
      </div>
    )
  }
}