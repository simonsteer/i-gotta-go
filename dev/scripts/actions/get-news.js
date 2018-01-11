import axios from 'axios'

export function getNews(keyword) {
  
  const key = 'ef5b1da564c34d71ab67bbd941011da8'

  return {
    type: 'GET_NEWS',
    payload: axios.get(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${key}&language=en`)
  }
}