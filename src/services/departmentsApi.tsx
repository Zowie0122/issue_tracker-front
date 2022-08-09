import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentsApi = createApi({
  reducerPath: "departments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",

    // with credentials (session ID cookie)
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),

  tagTypes: ["Department"],

  endpoints: (builder) => ({
    // get all department
    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Department"],
    }),

    // add a department
    addDepartment: builder.mutation({
      query: (payload) => ({
        url: "/departments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation } =
  departmentsApi;
