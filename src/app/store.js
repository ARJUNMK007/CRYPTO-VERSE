import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../COMPONENTS/CoinApi';
import { cryptoNewsApi } from '../COMPONENTS/CryptoNewsApi';

export default configureStore({
  reducer: {
    cryptoApi: cryptoApi.reducer,
    cryptoNewsApi: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware,cryptoNewsApi.middleware),

});


