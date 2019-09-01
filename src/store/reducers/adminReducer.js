/* actions */
import { ADMIN } from '../actions/admin/adminActionsType'

/** initial state */
const initialState = {
  configurations: false,
  loading: true
}


const admin = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN.FETCH_ADMIN_DONE:
      return {
        ...state,
        configurations: action.configs,
        loading: false
      }
    default:
      return state
  }
}

export default admin
