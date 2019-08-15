import { RANKING } from './rankingActionsType'
// import { fetchListMiddleware } from '../../middlewares/ranking/rankingMiddleware'

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
const fetchListService = (list) => {
  return async (dispatch, getState) => {
    dispatch( fetchStarting() )
    if (list) dispatch( fetchDone(list) )
    if (!list) dispatch( fetchError() )
    // const list = await fetchListMiddleware()
  }
}

export {
  fetchListService
}