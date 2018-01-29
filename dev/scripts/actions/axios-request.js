import axios from 'axios'

export function axiosRequest() {
  return {
    type: 'AXIOS',
    payload: axios.get('http://www.SOMEAPI.com/api/v1/ENDPOINT')
  }
}