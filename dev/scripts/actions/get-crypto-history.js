const cc = require('cryptocompare')
export function getCryptoHistory(period, ticker, currency) {
  
  let payload;

  let days
  switch (period) {
    case 'year':
      days = 364;
      payload = cc.histoDay(ticker, currency, { limit: days })
      break;
    case '6 months':
      days = 179;
      payload = cc.histoDay(ticker, currency, { limit: days })
      break;
    case '3 months':
      days = 89;
      payload = cc.histoDay(ticker, currency, { limit: days })
      break;
    case 'week':
      days = 6;
      payload = cc.histoDay(ticker, currency, { limit: days })
      break;
    case 'day':
      payload = cc.histoHour(ticker, currency, { limit: 24 })
      break;
  }

  return {
    type: 'GET_HISTORY',
    payload
  }
}