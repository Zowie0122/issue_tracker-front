import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { deepSnakeToCamel } from '../utils/format';
import { KeyValuePairObj } from '../types';

export const issuesApi = createApi({
  reducerPath: 'issues',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',

    // with credentials (session ID cookie)
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),

  tagTypes: ['Issues', 'Issue'],

  endpoints: (builder) => ({
    // get all issues
    getIssues: builder.query({
      query: ({ tag, id }) => {
        if (tag === 'received') {
          return `/issues?receiver=${id}`;
        } else if (tag === 'issued') {
          return `/issues?issuer=${id}`;
        }
        return '/issues';
      },
      transformResponse: (responseData: any) => {
        return responseData.map((issueObj: KeyValuePairObj) => deepSnakeToCamel(issueObj));
      },
      providesTags: ['Issues'],
    }),

    // get a single issue by ID
    getIssueById: builder.query({
      query: ({ id }) => `/issues?id=${id}`,
      transformResponse: (responseData: any) => {
        return responseData.map((issueObj: KeyValuePairObj) => ({
          ...deepSnakeToCamel(issueObj),
          comments: issueObj.comments.map((comment: KeyValuePairObj) => deepSnakeToCamel(comment)),
        }))[0];
      },
      providesTags: ['Issue'],
    }),

    // add an issue
    addIssue: builder.mutation({
      query: (payload) => ({
        url: '/issues',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Issues'],
    }),

    // update an issue
    updateIssue: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/issues/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Issue', 'Issues'],
    }),

    // add a comment
    addComment: builder.mutation({
      query: (payload) => ({
        url: '/comments',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Issue'],
    }),
  }),
});

export const {
  useGetIssuesQuery,
  useGetIssueByIdQuery,
  useAddIssueMutation,
  useUpdateIssueMutation,
  useAddCommentMutation,
} = issuesApi;
