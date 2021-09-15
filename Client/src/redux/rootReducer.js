import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loggedInSlice from "./reducers/loggedInSlice";
import weatherSlice from "./reducers/weatherSlice";
import eventsSlice from "./reducers/eventsSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loggedIn']
}




const rootReducer = combineReducers({
    loggedIn: loggedInSlice,
    weather: weatherSlice,
    event: eventsSlice
})

export default persistReducer(persistConfig, rootReducer)