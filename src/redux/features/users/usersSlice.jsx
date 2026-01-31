import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Eva",
  email: "eva@gmail.com",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
