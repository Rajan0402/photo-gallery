import { createSlice } from "@reduxjs/toolkit";

interface authState {
  userInfo: {};
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: authState = {
  userInfo: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
