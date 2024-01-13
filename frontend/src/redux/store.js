import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/reducers/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    // devTools: false,
})