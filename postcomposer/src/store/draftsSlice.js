import { createSlice } from "@reduxjs/toolkit";

const initialState={
    drafts : []
}
const draftsSlice = createSlice({
    name:"draftsContent",
    initialState,
    reducers:{
        setDrafts(state,action){
            state.drafts = action.payload;
        },
        addDraft(state,action){
            state.drafts.push(action.payload);
        },
        deleteDraft(state,action){
            state.drafts = state.drafts.filter((dobj)=>dobj.id!=action.payload);
        }
    }
})

export const {setDrafts,addDraft,deleteDraft} = draftsSlice.actions;
export default draftsSlice.reducer;