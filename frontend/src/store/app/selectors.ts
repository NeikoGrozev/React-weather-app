import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const getAppState = (state: RootState) => state.app;

export const isDay = createSelector(
  [getAppState],
  (appState) => appState.isDay
);

export const isSpinnerVisible = createSelector(
  [getAppState],
  (appState) => appState.isSpinnerVisible
);
