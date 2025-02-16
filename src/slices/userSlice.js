import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user", 
    initialState: {
        role: null
    }, 
    reducers: {
        authenticate: (state, action) => {
            state.role = action.payload;
        }, 
        logout: (state) => {
            state.role = null;
        }
    }
});

export const { authenticate, logout } = userSlice.actions;
export default userSlice.reducer;
