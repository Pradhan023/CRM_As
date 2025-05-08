import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import loginreducer from "../pages/login/LoginSlice"
import productreducer from "../pages/product/ProductSlice"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'], // only persist the auth slice
  };

  const rootReducer = combineReducers({
    login: loginreducer,
    products : productreducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // needed for redux-persist
      }),
  });
  
  export const persistor = persistStore(store);

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;