import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
 isLoggedIn : false,
 role:null,
 token:null   
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state, action){ 
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.role = null;
            state.token = null;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;