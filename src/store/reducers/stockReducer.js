/* actions */
import { STOCK } from '../actions/stock/stockActionsType'

/** initial state */
const initialState = {
  quantity: {
    heaphones: '--',
    mugs: '--',
    socks: '--'
  },
  loading: true
}


const stock = (state = initialState, action) => {
  // console.log('Reducer: ', action)
  switch (action.type) {
    case STOCK.FETCH_STOCK_DONE:
      return {
        ...state,
        quantity: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default stock
