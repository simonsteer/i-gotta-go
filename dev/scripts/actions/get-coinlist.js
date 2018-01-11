import axios from 'axios'
const cc = require('cryptocompare')

export function getCoinlist() {
  return {
    type: 'GET_COINLIST',
    payload: cc.coinList()
  }
}