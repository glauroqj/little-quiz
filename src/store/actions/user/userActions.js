import { USER } from './userActionsType'
import {
  fetchUserMiddleware,
  loginUserMiddleware
} from '../../middlewares/user/userMiddleware'

const fetchStarting = () => ({
  type: USER.VERIFY_USER_STARTING
})
const fetchDone = user => ({
  type: USER.VERIFY_USER_DONE,
  user
})
const fetchError = () => ({
  type: USER.VERIFY_USER_ERROR
})
/** login */
const loginStarting = () => ({
  type: USER.LOGIN_USER_STARTING
})
const loginDone = user => ({
  type: USER.LOGIN_USER_DONE,
  user
})
const loginError = () => ({
  type: USER.LOGIN_USER_ERROR
})

/** thunk */
const fetchUserService = () => {
  return async (dispatch, getState) => {
    dispatch( fetchStarting() )
    const user = await fetchUserMiddleware()
    if (user) dispatch( fetchDone(user) )
    if (!user) dispatch( fetchError() )
    return user
  }
}

const loginService = (form) => {
  return async (dispatch, getState) => {
    dispatch( loginStarting() )
    const userLogin = await loginUserMiddleware(form)
    if (userLogin) dispatch( loginDone(userLogin) )
    if (!userLogin) dispatch( loginError() )
    return userLogin
  }
}

export {
  fetchUserService,
  loginService
}