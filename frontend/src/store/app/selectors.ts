import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const getAppState = (state: RootState) => state.app;

export const isDay = createSelector(
  [getAppState],
  (appState) => appState.isDay
);
