import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { loanAmount: number | null } = {
  loanAmount: null,
};

export const loanApplicationSlice = createSlice({
  name: "loanApplication",
  initialState,
  reducers: {
    setLoanAmount: (state, action: PayloadAction<number | null>) => {
      state = { ...state, loanAmount: action.payload };
      return state;
    },
  },
});

export const { setLoanAmount } = loanApplicationSlice.actions;

const loanApplicationReducer = loanApplicationSlice.reducer;

export default loanApplicationReducer;
