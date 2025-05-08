import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Auth {
  username: string;
  password: string;
}

interface State {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }: Auth, thunkAPI) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      return response.data.accessToken;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    loading: false,
    error: null,
  } as State,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
