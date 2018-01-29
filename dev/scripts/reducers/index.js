import { combineReducers } from 'redux'

import basic from './reducer'
import axios from './axios-reducer'

export default combineReducers({
  basic,
  axios
})