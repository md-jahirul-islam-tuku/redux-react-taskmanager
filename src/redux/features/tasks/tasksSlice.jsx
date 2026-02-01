import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};

const STATUS_FLOW = {
  pending: "running",
  running: "done",
  done: "archive",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks: (state, { payload }) => {
      const nextId =
        state.task.length === 0
          ? 1
          : state.task[state.task.length - 1].id + 1;

      state.task.push({
        id: nextId,
        status: "pending",
        ...payload,
      });
    },

    removeTask: (state, { payload }) => {
      state.task = state.task.filter((task) => task.id !== payload);
    },

    updatedStatus: (state, { payload }) => {
      const task = state.task.find((task) => task.id === payload);
      if (task && STATUS_FLOW[task.status]) {
        task.status = STATUS_FLOW[task.status];
      }
    },
  },
});

/* -------------------- SELECTORS -------------------- */

// base selector
const selectTasks = (state) => state.tasks.task;

// selector factory (VERY IMPORTANT)
export const makeSelectUserTasks = () =>
  createSelector(
    [selectTasks, (_, user) => user],
    (tasks, user) =>
      tasks.filter((task) =>
        Array.isArray(task.assignees)
          ? task.assignees.includes(user)
          : task.assignees === user
      )
  );

export const { addTasks, removeTask, updatedStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
