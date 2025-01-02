import { createSlice } from "@reduxjs/toolkit";

interface initialStateProp {
  isDay: boolean;
  isSpinnerVisible: boolean;
}

const initialState: initialStateProp = {
  isDay: true,
  isSpinnerVisible: false,
};
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    checkTime(state) {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 7 && hour < 19) {
        state.isDay = false;
      } else {
        state.isDay = true;
      }
    },
    setSpinnerIsVisible(state, action) {
      state.isSpinnerVisible = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
