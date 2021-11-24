import {createStore }from 'redux'
import rootReducer from './rootReducer'
import { persistStore } from 'redux-persist'
import {composeWithDevTools } from 'redux-devtools-extension'


export const store = createStore(rootReducer, composeWithDevTools() )

export const persistor = persistStore(store)

const reduxModule = {
    store, persistor
}

export default reduxModule
