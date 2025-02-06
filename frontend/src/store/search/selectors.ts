import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

const getSearchState = (state: RootState) => state.search;

export const getQuery = createSelector(
  [getSearchState],
  (searchState) => searchState.query
);

export const getAutocompleteResult = createSelector(
  [getSearchState],
  (searchState) => searchState.autocompleteResult
);

export const getSearchResult = createSelector(
  [getSearchState],
  (searchState) => searchState.searchResult
);

export const isDropdownOpen = createSelector(
  [getSearchState],
  (searchState) => searchState.isDropdownOpen
);
