/* actions */
import { RANKING } from '../actions/ranking/rankingActionsType'

/** initial state */
const initialState = {
  list: [],
  front: [],
  back: [],
  loading: true
}


const ranking = (state = initialState, action) => {
  // console.log('Reducer: ', action)
  switch (action.type) {
    case RANKING.FETCH_RANKING_DONE:
      return {
        ...state,
        list: action.list,
        front: action.list.filter(item => item.type === 'front'),
        back: action.list.filter(item => item.type === 'back'),
        loading: false
      }
    default:
      return state
  }
}

export default ranking
