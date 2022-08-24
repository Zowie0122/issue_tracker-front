import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type CredentialsT = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',

    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    // login
    addAuth: builder.mutation({
      query: (payload: CredentialsT) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),

    // logout
    removeAuth: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddAuthMutation, useRemoveAuthMutation } = authApi;
