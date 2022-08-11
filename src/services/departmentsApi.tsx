import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Department } from '../types';

export const departmentsApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',

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
      transformResponse: (responseData: any) => ({
        id: responseData?.id,
        name: responseData?.name,
      }),
      invalidatesTags: ['Departments'],
    }),
  }),
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation } = departmentsApi;
