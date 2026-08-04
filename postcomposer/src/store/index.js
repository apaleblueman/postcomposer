import {configureStore} from "@reduxjs/toolkit"
import postsrReducer from "./postsSlice"
export const store=configureStore({
    reducer:{
        post:postsrReducer
    }
})