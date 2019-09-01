import { combineReducers } from 'redux'
import ranking from './rankingReducer'
import user from './userReducer'
import stock from './stockReducer'
import admin from './adminReducer'

export default combineReducers({
  ranking,
  user,
  stock,
  admin
})