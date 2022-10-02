import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

const middleWares = [logger, thunk];

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middleWares)
))

export const persistor = persistStore(store)