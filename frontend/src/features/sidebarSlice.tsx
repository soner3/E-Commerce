import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "../interfaces";

const initialState: SidebarState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    handleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { handleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
