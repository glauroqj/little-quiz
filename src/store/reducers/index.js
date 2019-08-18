import { combineReducers } from 'redux'
import ranking from './rankingReducer'
import user from './userReducer'

export default combineReducers({
  ranking,
  user
})