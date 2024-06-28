import {configureStore, Store, getDefaultMiddleware} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'products',
    'currentPlacedOrder',
    'orderHistory',
    'stateUpdater',
    'categroies',
    'suggested',
    'cart',
    'transactions',
    'categories',
    'monthlyData',
  ],
};

const middleware = [
  ...getDefaultMiddleware({
    // serializableCheck: {
    //   // Ignore these action types
    //   ignoredActions: ['persist/PERSIST'],
    //   ignoredActionPaths: ['currentPlacedOrder.currentOrderDetails.headers'],
    // },
    immutableCheck: false,
    serializableCheck: false,
  }),
];

const store: Store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware,
});
const persistor = persistStore(store);

const exportObj = {
  store,
  persistor,
};

export default exportObj;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
