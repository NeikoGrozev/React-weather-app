import { configureStore } from "@reduxjs/toolkit";
import app from "./app/slice";
import account from "./account/slice";
import search from "./search/slice";

const store = configureStore({
  reducer: {
    app,
    account,
    search,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
