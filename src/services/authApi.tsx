import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',

    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    // login
    addAuth: builder.mutation({
      query: (payload: any) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),

    // logout
    removeAuth: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useAddAuthMutation, useRemoveAuthMutation } = authApi;
