import { createSlice } from "@reduxjs/toolkit";

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
      if (state.task.length === 0) {
        state.task.push({ id: 1, status: "pending", ...payload });
      } else {
        const lastElement = state.task.at(-1);
        state.task.push({
          id: lastElement.id + 1,
          status: "pending",
          ...payload,
        });
      }
    },
    removeTask: (state, { payload }) => {
      state.task = state.task.filter((i) => i.id !== payload);
    },
    updatedStatus: (state, { payload }) => {
      const task = state.task.find((i) => i.id === payload);
      if (task && STATUS_FLOW[task.status]) {
        task.status = STATUS_FLOW[task.status];
      }
    },
  },
});

export const selectUserTasks = (user) => (state) =>
  state.tasks.task.filter((i) =>
    Array.isArray(i.assignees)
      ? i.assignees.includes(user)
      : i.assignees === user,
  );

export const { addTasks, removeTask, updatedStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
