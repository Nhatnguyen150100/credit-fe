import { TTab } from "./../../types/tab";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DEFINE_TAB from "../../constants/tab";

const initialState: { tab: TTab } = {
  tab: DEFINE_TAB.HOME
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TTab>) => {
      state = { ...state, tab: action.payload };
      return state;
    },
  },
});

export const { setTab } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
