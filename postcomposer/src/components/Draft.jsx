import { platformInfo } from "../assets/platformInfo";
import "../assets/Draft.css"
import CopyToClipboard from "react-copy-to-clipboard";
import {useSelector, useDispatch} from 'react-redux';
import { addDraft,deleteDraft } from "../store/draftsSlice";
import { setPostText,clearPost} from "../store/postsSlice";

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
//old props:{drafts,setDraft,postText,setPostText,selectedPlatforms,setSelectedPlatforms}
function Draft(){
    const dispatch = useDispatch();
    const drafts = useSelector((state)=>state.drafts.drafts)
    const postText = useSelector((state)=>state.posts.postText)
    const selectedPlatforms = useSelector((state)=>state.posts.selectedPlatforms)
    return (
        <div>
            <button onClick={()=>{
                const draftOBJ = createDraftObj(postText,selectedPlatforms);
                console.log(draftOBJ)
                if(drafts.includes([draftOBJ.content])){console.log("duplicate draft!")}
                dispatch(addDraft(draftOBJ));
                dispatch(clearPost());
                console.log(drafts);
            }}>saveDraft</button>
            <div className="Drafts">
                {drafts.map((obj)=>{
                        const timestampObj = new Date(obj.timestamp);
                        const dateObj = timestampObj.toLocaleString();
                        return <div className="draftCard" key={obj.id}>
                            <div className="platformImages">
                                <img src={obj.platforms[0]} className={obj.platforms[0]?'':'hidden'}></img>
                                <img src={obj.platforms[1]} className={obj.platforms[1]?'':'hidden'}></img>
                                <img src={obj.platforms[2]} className={obj.platforms[2]?'':'hidden'}></img>
                            </div>
                            <p className="content">{obj.content}</p>
                            <p className="timestamp">{dateObj}</p>
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
                                <CopyToClipboard text={obj.content}>
                                <button type="button">Copy to clipboard</button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    })}
            </div>
        </div>
    )
  }
  export default Draft;