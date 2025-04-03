import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "../../types/admin";

const initialState: { info?: IAdmin; listAdminInfo?: IAdmin[] } = {};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminInfo: (state, action: PayloadAction<IAdmin>) => {
      state = { ...state, info: action.payload };
      return state;
    },
    setListAdminInfo: (state, action: PayloadAction<IAdmin[]>) => {
      state = { ...state, listAdminInfo: action.payload };
      return state;
    },
    clearStore: () => {
      return initialState;
    },
  },
});

export const { setAdminInfo, setListAdminInfo } = adminSlice.actions;

const adminReducer = adminSlice.reducer;

export default adminReducer;
