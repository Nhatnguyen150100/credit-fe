import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state = { ...action.payload };
            return state;
        },
    },
});

export const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;