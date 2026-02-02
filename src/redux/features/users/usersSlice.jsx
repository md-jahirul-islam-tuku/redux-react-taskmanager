import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    return { email: data.user.email, name: data.user.displayName };
  },
);

export const signInUser = createAsyncThunk(
  "usersSlice/signInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return { email: data.user.email, name: data.user.displayName };
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      ((state.name = payload.name), (state.email = payload.email));
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = "";
        state.name = "";
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.email = "";
        state.name = "";
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload.email;
        state.name = payload.name;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      });
  },
});

export const { setUsers, toggleLoading, logout } = usersSlice.actions;

export default usersSlice.reducer;
