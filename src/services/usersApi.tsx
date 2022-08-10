import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",

    // with credentials (session ID cookie)
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["User"],
  // endpoints
  endpoints: (builder) => ({
    // get all users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // get a single user by ID
    getUser: builder.query({
      query: (id) => `/users?id=${id}`,
      providesTags: ["User"],
    }),

    // get current logged in user
    getSelf: builder.query({
      query: () => `/users?self=1`,
      providesTags: ["User"],
    }),

    // current user update him/her self
    updateSelf: builder.mutation({
      query: ({ id, payload }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    // admin add a new user
    addUser: builder.mutation({
      query: (payload) => ({
        url: "/admins/users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // admin update a user
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/admins/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetSelfQuery,
  useUpdateSelfMutation,
  useAddUserMutation,
  useUpdateUserMutation,
} = usersApi;
