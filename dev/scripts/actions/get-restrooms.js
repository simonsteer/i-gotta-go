import axios from 'axios'

export default function getRestrooms(lat, lng, ada, unisex) {
  return {
    type: 'GET_RESTROOMS',
    payload: axios.get('https://www.refugerestrooms.org/api/v1/restrooms/by_location', {
      params: {
        lat,
        lng,
        ada,
        unisex
      }
    })
  }
}