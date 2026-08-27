import { platformInfo } from "../assets/platformInfo";
import "../assets/Draft.css"

import CopyToClipboard from "react-copy-to-clipboard";
import {useSelector, useDispatch} from 'react-redux';
import { addDraft,deleteDraft,clearDrafts,selectDraftCount, selectDraftsByPlatform} from "../store/draftsSlice";
import { setPostText,clearPost} from "../store/postsSlice";
import { selectAllDrafts } from "../store/draftsSlice";
import { selectCurrentPost,selectSelectedPlatforms} from "../store/postsSlice";
import { useState, memo, useMemo } from "react";
function createDraftObj(postText,selectedPlatforms){
    
return {
    "id":crypto.randomUUID(),
    "content":postText,
    "platforms":selectedPlatforms.map((plt)=>{
        return platformInfo[plt].icon;
    }),
    "platformNums":selectedPlatforms,
    "timestamp":Date.now()
}
}
function Draft(){
const dispatch = useDispatch();

const postText = useSelector(selectCurrentPost);
const selectedPlatforms = useSelector(selectSelectedPlatforms);  
const role = useSelector((state)=>state.auth.role);  
const [filter, setFilter] = useState([]);
const drafts = useSelector((state)=>{
    if(filter.length<1){
        return selectAllDrafts(state);
    }else{
        return selectDraftsByPlatform(state, filter);
    }
});
const sortedDrafts = useMemo(()=>{
    return [...drafts].sort((a,b)=> b.timestamp - a.timestamp);
},[drafts])
const draftsCount = useSelector(selectDraftCount);  
return (
    <div>
        <div>Total Drafts: {draftsCount}</div>
        {role !=="Viewer" && (<>
                <button onClick={()=>{
            const draftOBJ = createDraftObj(postText,selectedPlatforms);
            console.log(draftOBJ)
            if(drafts.includes([draftOBJ.content])){console.log("duplicate draft!")}
            dispatch(addDraft(draftOBJ));
            dispatch(clearPost());
            const platformsFound = document.getElementsByClassName("checkbox");
            for(let i=0;i<platformsFound.length;i++){
                platformsFound[i].checked = false;
            }
            console.log(drafts);
        }}>Save as draft</button>
        <button onClick={()=>{
            dispatch(clearDrafts());
        }}>Clear drafts</button>
        </>    
        )}
        <div className="filters">Filter:
            <div className="platforms">
            <div><label><img className="favicon" src={platformInfo[1].icon}/></label>
            <input type="checkbox" id="twitter" className="checkbox" name="1" onChange={(e)=>{
            if(e.target.checked){
                setFilter([...filter,Number(e.target.name)]);
            }else{
                setFilter(filter.filter((plt_id)=>plt_id!==Number(e.target.name)));
            }
            }}></input></div>
            <div><label><img className="favicon" src={platformInfo[3].icon}/></label>
            <input type="checkbox" id="instagram" className="checkbox" name="3" onChange={(e)=>{
            if(e.target.checked){
                setFilter([...filter,Number(e.target.name)]);
            }else{
                setFilter(filter.filter((plt_id)=>plt_id!==Number(e.target.name)));
            }
            }}></input></div>
            <div><label><img className="favicon" src={platformInfo[5].icon}/></label>
            <input type="checkbox" id="Facebook" className="checkbox" name="5" onChange={(e)=>{
            if(e.target.checked){
                setFilter([...filter,Number(e.target.name)]);
            }else{
                setFilter(filter.filter((plt_id)=>plt_id!==Number(e.target.name)));
            }
            }}></input></div>
            </div>
        </div>

        <div className="Drafts">
            {sortedDrafts.map((obj)=>{
                return <DraftCard key={obj.id} obj={obj} selectedPlatforms={selectedPlatforms} />
            })}
        </div>
    </div>
)
}
const DraftCard = memo(function DraftCard({obj, selectedPlatforms}){
    const dispatch = useDispatch();
    const timestampObj = new Date(obj.timestamp);
    const dateObj = timestampObj.toLocaleString();
    const role = useSelector((state)=>state.auth.role);  
    return(
        <div className="draftCard">
        <div className="platformImages">
        <img src={obj.platforms[0]} className={obj.platforms[0]?'':'hidden'}></img>
        <img src={obj.platforms[1]} className={obj.platforms[1]?'':'hidden'}></img>
        <img src={obj.platforms[2]} className={obj.platforms[2]?'':'hidden'}></img>
        </div>
        <p className="content">{obj.content}</p>
        <p className="timestamp">{dateObj}</p>
        {role !== "Viewer" && (
            <div className="controls">
            <button onClick={()=>{
            dispatch(setPostText(obj.content));
            dispatch(deleteDraft(obj.id));
            console.log(selectedPlatforms);
            }}>Edit</button>
            <button onClick={()=>{
            // console.log("i work!");
            dispatch(deleteDraft(obj.id));
            }}>Delete</button>
            
            </div>
        )}
        <CopyToClipboard text={obj.content}>
            <button type="button">Copy to clipboard</button>
            </CopyToClipboard>
        </div>
    )
})

export default Draft;
