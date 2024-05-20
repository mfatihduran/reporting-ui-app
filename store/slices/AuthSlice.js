import { createSlice } from "@reduxjs/toolkit";

 
const initialSliceState = { isAuthenticated: false, token: null};

const authSlice = createSlice({
    name: "authentication",
    initialState: initialSliceState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
            state.isAuthenticated=true;
        },
        logout(state) {
            state.isAuthenticated=false;
            state.token = null;
        }
    }
});

export const authSliceActions = authSlice.actions;

export default authSlice;