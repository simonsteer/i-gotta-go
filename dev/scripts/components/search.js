import React from 'react'
import CurrencyTile from './currency-tile'
import Loading from './loading'

import { connect } from 'react-redux'
import { getCoinlist } from '../actions/get-coinlist'
import { getCoinlistData } from '../actions/get-coinlist-data'

@connect(store => {
  return {
    user: store.user,
    coinlist: store.coinlist,
    coinlistdata: store.coinlistdata,
    scrollbar: store.scrollbar
  }
})
export default class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      cryptos: [],
      page: 0,
      results: []
    }
    this.getCoins = this.getCoins.bind(this)
    this.tiles = this.tiles.bind(this)
    this.pageLoader = this.pageLoader.bind(this)
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchEnter = this.handleSearchEnter.bind(this)
  }

  getCoins() {

    const search = document.querySelector('.search-module')
    search.removeEventListener('scroll', this.pageLoader)

    const cryptos = this.state.cryptos
    const page = this.state.page
    const list = cryptos.slice(page * 40, (page + 1) * 40)
    console.log(list)
    this.props.dispatch(getCoinlistData(list, this.props.user.currency)).then(response => {
      console.log(response)

      let results = this.state.results

      for (let key in response.value) {
        results.push({ [key]: response.value[key] })
      }

      this.setState({
        results
      }, () => {
        search.addEventListener('scroll', this.pageLoader)
      })
    })
  }

  
  tiles = () => {
    let tiles = []
    const list = this.state.results
    for (let i = 0; i < list.length; i++) {
      const ticker = Object.keys(list[i])[0]
      tiles.push(
        <CurrencyTile
          ticker={ticker}
          name={this.props.coinlist.list[ticker].CoinName}
          key={ticker}
          price={list[i][ticker][this.props.user.currency]}
        />)
    }
    return tiles
  }

  pageLoader(event) {
    const element = event.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log('next page loading')
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getCoins()
      })
    }
  }
    
  componentDidMount() {
    const dbRef = firebase.database().ref(`users/${this.props.user.id}/currency`)
    dbRef.on('value', () => {
      this.setState({
        cryptos: [],
        page: 0,
        results: []
      }, () => {
        this.props.dispatch(getCoinlist()).then(() => {
          this.setState({
            cryptos: Object.keys(this.props.coinlist.list)
          }, () => {
            this.getCoins()
          })
        })
        window.addEventListener('keydown', this.handleSearchEnter)
      })
    })
  }

  handleSearchEnter(event) {
    const search = document.querySelector('.search-module__input')
    if (event.keyCode === 13 && document.activeElement === search) {
      this.handleSearchInput(search.value)
      search.value = ''
    }
  }

  handleSearchInput(input) {
    const string = new RegExp(input, 'i')
    let list = this.props.coinlist.list
    let cryptos = Object.keys(this.props.coinlist.list)

    let newCryptos = []

    for (let i = 0; i < cryptos.length; i++) {
      if (string.test(list[cryptos[i]].CoinName) || string.test(list[cryptos[i]].Name)) {
        newCryptos.push(cryptos[i])
      }
    }  
    
    this.setState({
      cryptos: newCryptos,
      page: 0,
      results: []
    }, () => this.getCoins())

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleSearchEnter)
  }

  render() {
    return (
      <div className="search-container">
        {this.props.coinlist.fetching
        ?
          <Loading />
        :
          <div className="search-module" onScroll={this.pageLoader} style={{ marginRight: `-${this.props.scrollbar.width}px` }}>
            <input
              className="search-module__input"
              type="text"
              placeholder="Hit enter to search by ticker or coin name"
            />
            <ul className="search-module__currencies-list">
              {this.tiles()}
            </ul>
          </div>
        }
      </div>
      
    )
  }
}