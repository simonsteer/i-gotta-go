import axios from 'axios'
const cc = require('cryptocompare')

export function getCoinlistData(arr, cur) {
  return {
    type: 'GET_COINLIST-DATA',
    payload: cc.priceMulti(arr, cur)
  }
}