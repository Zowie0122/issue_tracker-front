import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateI } from "./root";

// TODO: add to the constant
const URI = `http://localhost:8080/tests`;

// define types for the slice state
export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  company_id: number;
  company: string;
  role_id: number;
  role: string;
  department_id: number;
  department: string;
  status: 0 | 1;
  issued?: number;
  received?: number;
};

export interface UsersStateI {
  entities: User[];
  loading: boolean;
  error: unknown;
}

// define the initial state using that type
const initialState: UsersStateI = {
  entities: [],
  loading: false,
  error: null,
};

// thunks
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const { data } = await axios.get(URI);
  return data as User[];
});

// define slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
        return state;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        return (state = {
          entities: action.payload,
          loading: false,
          error: null,
        });
      });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      return state;
    });
  },
});

// define selectors
export const allUsersEntitiesSelector = (state: RootStateI) =>
  state.users.entities;
export const allUsersLoadingSelector = (state: RootStateI) =>
  state.users.loading;
export const allUsersErrorSelector = (state: RootStateI) => state.users.error;

export default usersSlice.reducer;
