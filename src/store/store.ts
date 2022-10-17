import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()
const middleWares = [logger, sagaMiddleware];

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middleWares)
))

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)