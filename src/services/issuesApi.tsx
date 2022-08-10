import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Issue, Comment } from '../types';

export const issuesApi = createApi({
  reducerPath: 'issues',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',

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
      providesTags: (result) =>
        result
          ? [...result.map(({ id }: any) => ({ type: 'Issues' as const, id })), { type: 'Issues', id: 'LIST' }]
          : [{ type: 'Issues', id: 'LIST' }],
    }),

    // get a single issue by ID
    getIssueById: builder.query({
      query: ({ id }) => `/issues?id=${id}`,
      transformResponse: (responseData: Issue[]) => {
        const {
          issuer_id,
          issuer_name,
          receiver_id,
          receiver_name,
          title,
          description,
          due_at,
          created_at,
          updated_at,
          status,
          comments: commentsList,
        } = responseData[0];

        return {
          issue: {
            title,
            description,
            issuerId: issuer_id,
            issuer: issuer_name,
            receiverId: receiver_id,
            receiver: receiver_name,
            createdAt: created_at,
            updatedAt: updated_at,
            dueAt: due_at,
            status,
          },
          comments: commentsList.map((comment: Comment) => ({
            issuer: comment.issuer_name,
            contents: comment.contents,
            createdAt: comment.created_at,
          })),
        };
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
      invalidatesTags: [{ type: 'Issues', id: 'LIST' }],
    }),

    // update an issue
    updateIssue: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/issues/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Issue'],
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
