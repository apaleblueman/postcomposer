import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    postText:'',
    selectedPlatforms:[]
}
const postsSlice = createSlice({
    name:"postContent",
    initialState,
    reducers:{
        setPostText(state,action){
            state.postText = action.payload;
        },
        setSelectedPlatforms(state,action){
            state.selectedPlatforms = action.payload;
        },
        clearPost(state){
            state.postText='';
            state.selectedPlatforms=[];
        }
    }
})

export const {setPostText,setSelectedPlatforms,clearPost} = postsSlice.actions;
export default postsSlice.reducer;

//basic selectors
export const selectCurrentPost = (state)=>state.posts.postText;
export const selectSelectedPlatforms = (state)=>state.posts.selectedPlatforms;