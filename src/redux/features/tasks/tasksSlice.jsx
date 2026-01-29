import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
