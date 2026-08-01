import { platformInfo } from "../assets/platformInfo";
import "../assets/Draft.css"
import CopyToClipboard from "react-copy-to-clipboard";
function createDraftObj(postText,selectedPlatforms){
    return {
        "id":crypto.randomUUID(),
        "content":postText,
        "platforms":selectedPlatforms.map((plt)=>{
            return platformInfo[plt].icon;
        }),
        "platformNumber":selectedPlatforms.map((plt)=>{
            return [plt];
        }),
        "timestamp":Date.now()
    }
}
function Draft({drafts,setDraft,postText,setPostText,selectedPlatforms,setSelectedPlatforms}){
    return (
        <div>
            <button onClick={()=>{
                const draftOBJ = createDraftObj(postText,selectedPlatforms);
                console.log(draftOBJ)
                setDraft(drafts=>[...drafts,draftOBJ]);
                console.log(drafts)
            }}>saveDraft</button>
            <div className="Drafts">
                {drafts.map((obj)=>{
                        
                        const timestampObj = new Date(obj.timestamp);
                        const dateObj = timestampObj.toLocaleString();
                        return <div className="draftCard"key={obj.id}>
                            
                            <div className="platformImages">
                                <img src={obj.platforms[0]} className={obj.platforms[0]?'':'hidden'}></img>
                                <img src={obj.platforms[1]} className={obj.platforms[1]?'':'hidden'}></img>
                                <img src={obj.platforms[2]} className={obj.platforms[2]?'':'hidden'}></img>
                            </div>
                            <p className="content">{obj.content}</p>
                            <p className="timestamp">{dateObj}</p>
                            <div className="controls">
                                <button onClick={()=>{
                                        console.log("i work!");
                                        setPostText(obj.content);
                                        setSelectedPlatforms([...selectedPlatforms,obj.platformNumber])
                                        console.log(selectedPlatforms);
                                }}>Edit</button>
                                <button onClick={()=>{
                                        // console.log("i work!");
                                        setDraft(prev => prev.filter(d => d.id !== obj.id));
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