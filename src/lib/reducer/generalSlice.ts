import { TTab } from "./../../types/tab";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DEFINE_TAB from "../../constants/tab";

const initialState: { tab: TTab, firstVisit: boolean } = {
  tab: DEFINE_TAB.HOME,
  firstVisit: true
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TTab>) => {
      state = { ...state, tab: action.payload };
      return state;
    },
    setFirstVisit: (state, action: PayloadAction<boolean>) => {
      state = { ...state, firstVisit: action.payload };
      return state;
    },
  },
});

export const { setTab, setFirstVisit } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
