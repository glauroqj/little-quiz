import { STOCK } from './stockActionsType'
// import { fetchListMiddleware } from '../../middlewares/ranking/rankingMiddleware'

const fetchStarting = () => ({
  type: STOCK.FETCH_STOCK_STARTING
})
const fetchDone = payload => ({
  type: STOCK.FETCH_STOCK_DONE,
  payload
})
const fetchError = () => ({
  type: STOCK.FETCH_STOCK_ERROR
})

/** thunk */
const fetchStockService = (payload) => {
  return async (dispatch, getState) => {
    dispatch( fetchStarting() )
    if (payload) dispatch( fetchDone(payload) )
    if (!payload) dispatch( fetchError() )
    // const list = await fetchListMiddleware()
  }
}

export {
  fetchStockService
}