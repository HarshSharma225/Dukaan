import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice"
import userReducer from "./userSlice"
import authReducer from "./authSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        auth: authReducer
    },
})

export default store;