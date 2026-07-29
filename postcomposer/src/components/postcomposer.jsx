import { useState } from "react";
import EnforceRules from "./rulesEnforcer";
import { platformRules } from "./rulesEnforcer";



function DeterminePlatform(selectedPlatforms){
    const sum =selectedPlatforms.reduce((a, b) => a + b, 0)
    return sum;
}

function ValidatePost(text, selectedPlatforms){
    const errorArray = [];
    if(selectedPlatforms.length<=0){
        errorArray.push("No platforms selected!")
    }else{
        if(text.length < 1){
                        errorArray.push("Not enough characters for"+selectedPlatforms)
        }
        const platformNumber  = DeterminePlatform(selectedPlatforms);
        // console.log("EnforceRules returned:", EnforceRules(text, platformNumber));
        // console.log("errorArray is now:", errorArray);
        errorArray.push(...EnforceRules(text, platformNumber));
    }
    // console.log(typeof(errorArray))
    return errorArray;
}
function List(text, selectedPlatforms){
    const errorArray = ValidatePost(text, selectedPlatforms)
    const displayList = errorArray.map((error)=><li>{error}</li>);
    return <ul>{displayList}</ul>
}
function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const foundErrors = List(postText, selectedPlatforms);
    // console.log(foundErrors);
    return(
        <div>
            <h1>PostComposer</h1>
            <p>Choose social media platform where u wish to post:</p>
            <form>
                <div className="platforms">
                    <label>X(formely twitter)</label>
                    <input type="checkbox" id="twitter" name="1" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input>
                    <label>Instagram</label>
                    <input type="checkbox" id="instagram" name="3" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input>
                    <label>Facebook</label>
                    <input type="checkbox" id="Facebook" name="5" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input>
                </div>
                <div className="userPost">
                        <textarea rows="20" cols="90" value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                </div>
                <div className="charactersList">
                        {selectedPlatforms.map((plt)=>{
                            if(plt == 1){return <p>T:{postText.length}/{platformRules.twitter.maxChars}</p>}
                            if(plt == 3){return <p>I:{postText.length}/{platformRules.instagram.maxChars}</p>}
                            if(plt == 5){return <p>F:{postText.length}/{platformRules.facebook.maxChars}</p>}
                        })}
                </div>
                <div className="errors">
                    {foundErrors}
                </div>
            </form>
        </div>
    )
}

export default PostComposer;