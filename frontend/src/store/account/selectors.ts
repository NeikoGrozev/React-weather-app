import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const getAccount = (state: RootState) => state.account;
