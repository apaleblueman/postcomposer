import { createSlice, createSelector } from "@reduxjs/toolkit";
let startingRole = null, startingToken = null, startingLogin = false;
if(localStorage.getItem("jwtToken") !== null){
      // setIsLoggedIn(true);
      const rawToken = localStorage.getItem("jwtToken");
      const splitToken = atob(rawToken.split(".")[1]);
      const tokenOBJ = JSON.parse(splitToken);
      startingRole = tokenOBJ.role;
      startingToken = rawToken;
      startingLogin = true;
}
const initialState = {
 isLoggedIn : startingLogin,
 role:startingRole,
 token:startingToken   
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