import {createSlice} from "@reduxjs/toolkit"
import Cookies  from "js-cookie"

const initialState = {
     user:  Cookies.get("userId") || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action)=>{
            state.user = action.payload;
            Cookies.set(action.payload)
        },

        logout: (state) =>{
            state.user = null;
            Cookies.remove("userId");
            Cookies.remove("user")
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;