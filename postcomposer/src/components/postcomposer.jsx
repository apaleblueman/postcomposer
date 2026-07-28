import { useState } from "react";
function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    return(
        <div>
            <h1>PostComposer</h1>
            <p>Choose social media platform where u wish to post:</p>
            <form>
                <div className="platforms">
                    <label>X(formely twitter)</label>
                    <input type="checkbox" id="twitter" name="twitter" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, e.target.name])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=e.target.name))
                        }
                        }}></input>
                    <label>Instagram</label>
                    <input type="checkbox" id="instagram" name="instagram" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, e.target.name])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=e.target.name))
                        }
                        }}></input>
                    <label>Facebook</label>
                    <input type="checkbox" id="Facebook" name="Facebook" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, e.target.name])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=e.target.name))
                        }
                        }}></input>
                </div>
                <div className="userPost">
                        <textarea value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                        <p>Characters:0/n</p>
                </div>
                <div className="errors">
                    <p>⚠️No post written</p>
                    <p>{selectedPlatforms}</p>
                    
                </div>
            </form>
        </div>
    )
}

export default PostComposer;