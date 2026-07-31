import { platformInfo } from "../assets/platformInfo";
function createDraftObj(postText,selectedPlatforms){
    return {
        "id":crypto.randomUUID(),
        "content":postText,
        "platforms":selectedPlatforms.map((plt)=>{
            return platformInfo[plt].name;
        }),
        "timestamp":Date.now()
    }
}
function Draft({drafts,setDraft,postText,selectedPlatforms}){
    return (
        <div>
            <button onClick={()=>{
                const draftOBJ = createDraftObj(postText,selectedPlatforms);
                console.log(draftOBJ)
                setDraft(drafts=>[...drafts,draftOBJ]);
                console.log(drafts)
            }}>saveDraft</button>
            <h1>Drafts:</h1>
            <ul className="Drafts">
                {drafts.map((obj)=>{
                        const timestampObj = new Date(obj.timestamp);
                        const dateObj = timestampObj.toLocaleString();
                        return <li key={obj.id}>post :{obj.content} for {obj.platforms} saved at {dateObj}</li>
                    })}
            </ul>
        </div>
    )
  }

  export default Draft;