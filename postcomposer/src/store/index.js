import {configureStore} from "@reduxjs/toolkit"
import postsrReducer from "./postsSlice"
import draftsReducer from "./draftsSlice"
export const store=configureStore({
    reducer:{
        post:postsrReducer,
        draft:draftsReducer
    }
})