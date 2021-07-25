import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'
import rootSagas from './rootSagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     ? composeWithDevTools(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSagas)

export default store