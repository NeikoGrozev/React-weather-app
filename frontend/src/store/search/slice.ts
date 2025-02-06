import { createSlice } from "@reduxjs/toolkit";
import { AutocompleteProps } from "../../interfaces/AutocompleteProps";
import { SearchResultProps } from "../../interfaces/SearchResultProps";

interface initialStateProp {
  query: string;
  autocompleteResult: AutocompleteProps[];
  searchResult: SearchResultProps[];
  isDropdownOpen: boolean;
}

const initialState: initialStateProp = {
  query: "",
  autocompleteResult: [],
  searchResult: [],
  isDropdownOpen: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setAutocompleteResult(state, action) {
      state.autocompleteResult = action.payload;
    },
    setSearchResult(state, action) {
      state.searchResult = action.payload;
      console.log("---123", state.searchResult);
    },
    setDropdownOpen(state, action) {
      state.isDropdownOpen = action.payload;
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
