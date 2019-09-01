import { ADMIN } from './adminActionsType'
import { fetchConfigurationMiddleware } from '../../middlewares/admin/adminMiddleware'

const fetchStarting = () => ({
  type: ADMIN.FETCH_ADMIN_STARTING
})
const fetchDone = configs => ({
  type: ADMIN.FETCH_ADMIN_DONE,
  configs
})
const fetchError = () => ({
  type: ADMIN.FETCH_ADMIN_ERROR
})

/** thunk */
const fetchConfigurationService = () => {
  return async (dispatch, getState) => {
    dispatch( fetchStarting() )
    const configs = await fetchConfigurationMiddleware()
    if (configs) dispatch( fetchDone(configs) )
    if (!configs) dispatch( fetchError() )
  }
}

export {
  fetchConfigurationService
}