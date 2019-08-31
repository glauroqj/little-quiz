/* actions */
import { USER } from '../actions/user/userActionsType'

/** initial state */
const initialState = {
  account: false,
  loading: true
}


const ranking = (state = initialState, action) => {
  switch (action.type) {
    case USER.VERIFY_USER_DONE:
      return {
        ...state,
        account: action.user,
        loading: false
      }
      case USER.LOGIN_USER_DONE:
        return {
          ...state,
          account: action.user,
          loading: false
        }
      case USER.LOGOUT_USER_DONE:
        return {
          ...state,
          account: false
        }
    default:
      return state
  }
}

export default ranking
