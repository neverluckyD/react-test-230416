import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import weatherReducer from './weatherSlice';

const persistConfig = {
  key: 'root',
  storage,
	whitelist: ['history']
}
const persistedReducer = persistReducer(persistConfig, weatherReducer);

export function makeStore() {
  return configureStore({
    reducer: { weather: persistedReducer },
		devTools: process.env.NODE_ENV !== 'production',
  })
}

export const store = makeStore()
export const persistor = persistStore(store)