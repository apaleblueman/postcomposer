import { createSlice } from "@reduxjs/toolkit";

const loadSavedDrafts = (()=>{
    const saved = localStorage.getItem("drafts");
    if(saved){
        try{
            return JSON.parse(saved)
        }catch(e){
            console.error("failed to load drafts:",e);
            return [];
        }
    }
    return [];
});
const initialState={
    drafts : loadSavedDrafts()
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