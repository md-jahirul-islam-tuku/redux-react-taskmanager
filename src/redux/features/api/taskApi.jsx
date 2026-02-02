import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "./baseApi";

export const taskApi = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000" || "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => "/tasks",
    }),
    getTaskById: build.query({
      query: (id) => `/tasks/${id}`,
    }),
    sendTask: build.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
    }),
    getPosts: build.query({
      query: () => "/posts",
    }),
    getPostById: build.query({
      query: (id) => `/posts/${id}`,
    }),
    sendPost: build.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskByIdQuery, useSendTaskMutation } =
  taskApi;

export const {
  useGetPostsQuery,
  useLazyGetPostByIdQuery,
  useSendPostMutation,
} = baseApi;
