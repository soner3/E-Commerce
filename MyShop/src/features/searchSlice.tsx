import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../interfaces";

const initialState: SearchState = {
  search: "",
  submittedSearch: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    handleSearchChange(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    handleSubmitSearch(state) {
      state.submittedSearch.push(state.search);
    },
  },
});

export const { handleSearchChange, handleSubmitSearch } = searchSlice.actions;
export default searchSlice.reducer;
