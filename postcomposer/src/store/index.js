import {configureStore} from "@reduxjs/toolkit"
import postsrReducer from "./postsSlice"
import draftsReducer from "./draftsSlice"
import platformsReducer from "./platformsSlice"
import authReducer from "./authSlice"
export const store=configureStore({
    reducer:{
        posts:postsrReducer,
        drafts:draftsReducer,
        platforms:platformsReducer,
        auth:authReducer
    }
});