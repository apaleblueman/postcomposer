import { createSlice } from "@reduxjs/toolkit";
import {platformInfo} from "../assets/platformInfo"
const initialState = {
    data:platformInfo
}

const platforms = createSlice({
    name:"platforms",
    initialState,
    reducers:{}
})

export default platforms.reducer;