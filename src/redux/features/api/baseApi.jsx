import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "/posts",
    }),
    getPostById: build.query({
      query: (id) => `/posts/${id}`,
    }),
    sendPost: build.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useSendPostMutation } =
  baseApi;
