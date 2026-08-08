import { createSlice, createSelector } from "@reduxjs/toolkit";

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
        },
        clearDrafts(state){
            state.drafts = []; 
        }
    }
})

export const {setDrafts,addDraft,clearDrafts,deleteDraft} = draftsSlice.actions;
export default draftsSlice.reducer;
//basic selectors
export const selectAllDrafts = (state)=> state.drafts.drafts;
//memoized selectors
export const selectDraftCount = createSelector(
    [selectAllDrafts],
    (returnedDraftArray)=> returnedDraftArray.length
)

export const selectDraftsByPlatform = createSelector(
    [
        selectAllDrafts,
        (state, filterArray)=>filterArray
    ],
    (drafts, filterArray)=>{
        return drafts.filter((draft)=>{
            return draft.platformNums.some(num=>filterArray.includes(num));
        })
    }
)

export const selectDraftsByUID = createSelector(
    [
        selectAllDrafts,
        (state, UID)=>UID
    ],
    (drafts, UID)=>{
        return drafts.find(draft => draft.id === UID);
    }
)