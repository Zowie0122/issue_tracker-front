import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issues",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",

    // with credentials (session ID cookie)
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),

  tagTypes: ["Issue"],

  endpoints: (builder) => ({
    // get all issues
    getIssues: builder.query({
      query: ({ tag, id }) => {
        console.log("rerun");
        if (tag === "received") {
          return `/issues?receiver=${id}`;
        } else if (tag === "issued") {
          return `/issues?issuer=${id}`;
        }
        return "/issues";
      },
      providesTags: ["Issue"],
    }),

    // get a single issue by ID
    getIssueById: builder.query({
      query: ({ id }) => `/issues?id=${id}`,
      transformResponse: (responseData: any[]) => {
        const {
          title,
          description,
          receiver_name,
          issuer_name,
          updated_at,
          created_at,
          status,
          comments: commentsList,
        } = responseData[0];

        return {
          issue: {
            title,
            description,
            issuer: issuer_name,
            receiver: receiver_name,
            updatedAt: updated_at,
            createdAt: created_at,
            status,
          },
          comments: commentsList.map((comment: any) => ({
            issuer: comment.issuer_name,
            contents: comment.contents,
            createdAt: comment.created_at,
          })),
        };
      },
      providesTags: ["Issue"],
    }),

    // add an issue
    addIssue: builder.mutation({
      query: (payload) => ({
        url: "/issues",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Issue"],
    }),

    // update an issue
    updateIssue: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/issues/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Issue", id: arg.id }],
    }),

    // add a comment
    addComment: builder.mutation({
      query: (payload) => ({
        url: "/comments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Issue", id: arg.id }],
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
