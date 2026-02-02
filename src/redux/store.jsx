import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import usersReducer from "./features/users/usersSlice";
import { taskApi } from "./features/api/taskApi";
import { baseApi } from "./features/api/baseApi";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      taskApi.middleware
    ),
});
