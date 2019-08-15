import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index'

const store = createStore(
    reducers,
    undefined,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )

export { store }