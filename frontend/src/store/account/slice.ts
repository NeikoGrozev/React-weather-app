import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: [],
  reducers: {},
});

export const accountAction = accountSlice.actions;
export default accountSlice.reducer;
