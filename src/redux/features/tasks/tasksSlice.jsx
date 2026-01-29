import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
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
      const updated = state.task.find((i) => i.id === payload.id);
      updated.status = "running";
    },
  },
});

export const { addTasks, removeTask, updatedStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
