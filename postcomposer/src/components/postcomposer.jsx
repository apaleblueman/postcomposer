import { useState } from "react";
function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    return(
        <div>
            <h1>PostComposer</h1>
            <p>Choose social media platform where u wish to post:</p>
            <form onClick={(e)=> setSelectedPlatforms([...selectedPlatforms,e.target.name])}>
                <div className="platforms">
                    <label>X(formely twitter)</label>
                    <input type="checkbox" id="twitter" name="twitter"></input>
                    <label>Instagram</label>
                    <input type="checkbox" id="instagram" name="instagram"></input>
                    <label>Facebook</label>
                    <input type="checkbox" id="Facebook" name="Facebook"></input>
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