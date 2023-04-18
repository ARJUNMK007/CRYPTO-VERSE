import { createApi, CreateApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const CryptoHeaders={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '20053e0647mshb84541d110cd9a4p1b17d1jsn24127a539c45',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl='https://bing-news-search1.p.rapidapi.com';

export const cryptoNewsApi= createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders:(headers)=>{
            headers.set('X-BingApis-SDK',CryptoHeaders['X-BingApis-SDK']);
            headers.set('X-RapidAPI-Key',CryptoHeaders['X-RapidAPI-Key']);
            headers.set('X-RapidAPI-Host',CryptoHeaders['X-RapidAPI-Host']);
            return headers;
        },

    }),
    endpoints:(builders)=>({
        getCryptoNews:builders.query({
            query:({newsCategory,count})=>(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        }),
    }),
});

export const {useGetCryptoNewsQuery}=cryptoNewsApi