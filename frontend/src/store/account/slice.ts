import { createSlice } from "@reduxjs/toolkit";

interface UserProps {
  user: {
    username: string;
    uid: string;
    email: string;
  };
}

const initialState: UserProps = {
  user: {
    username: "",
    uid: "",
    email: "",
  },
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = initialState.user;
    },
  },
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;
