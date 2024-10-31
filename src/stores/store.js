import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';
import storage from 'redux-persist/es/storage';
import { persistReducer as persist, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const persistConfig = {
  key: 'root',
  storage,
};

const persistReducer = persist(persistConfig, testReducer);
const store = configureStore({
  reducer: {
    test: persistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistore = persistStore(store);
export default store;