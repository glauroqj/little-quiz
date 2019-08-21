import { combineReducers } from 'redux'
import ranking from './rankingReducer'
import user from './userReducer'
import stock from './stockReducer'

export default combineReducers({
  ranking,
  user,
  stock
})