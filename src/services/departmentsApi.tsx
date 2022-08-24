import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const departmentsApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',

    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),

  tagTypes: ['Departments'],

  endpoints: (builder) => ({
    // get all department
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Departments'],
    }),

    // add a department
    addDepartment: builder.mutation({
      query: (payload) => ({
        url: '/admins/departments',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Departments'],
    }),
  }),
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation } = departmentsApi;
