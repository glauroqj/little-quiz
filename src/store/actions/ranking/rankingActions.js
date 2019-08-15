import { RANKING } from './rankingActionsType'
import { fetchListMiddleware } from '../../middlewares/ranking/rankingMiddleware'

const fetchStarting = () => ({
  type: RANKING.FETCH_RANKING_STARTING
})
const fetchDone = list => ({
  type: RANKING.FETCH_RANKING_DONE,
  list
})
const fetchError = () => ({
  type: RANKING.FETCH_RANKING_ERROR
})

/** thunk */
const fetchListService = () => {
  return async (dispatch, getState) => {
    dispatch( fetchStarting() )
    console.log('< RANKING ACTION >')
    const list = await fetchListMiddleware()
    if (list) dispatch( fetchDone(list) )
    if ('error') dispatch( fetchError() )
  }
}

export {
  fetchListService
}