import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react' 
const CryptoHeaders = {
  'X-RapidAPI-Key': '20053e0647mshb84541d110cd9a4p1b17d1jsn24127a539c45',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };
  
  const baseUrl = 'https://coinranking1.p.rapidapi.com';
  
  export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
      baseUrl:baseUrl,
       prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', CryptoHeaders['X-RapidAPI-Key']);
        headers.set('X-RapidAPI-Host', CryptoHeaders['X-RapidAPI-Host']);
        return headers;
      },
    }),
    endpoints: (builders) => ({
      getCryptos: builders.query({
        query: (count) => (`/coins`),
        
      }),
      getCryptosDeatils: builders.query({
        query: (coinId) => (`/coin/${coinId}`),
        
      }),
      getCryptosHistory: builders.query({
        query: (coinId,timeperiod) => (`/coin/${coinId}/history/`),
        
      }),
    }),
  });

  export const { useGetCryptosQuery } = cryptoApi;
  export const{useGetCryptosDeatilsQuery}=cryptoApi
  export const{useGetCryptosHistoryQuery}=cryptoApi;
  