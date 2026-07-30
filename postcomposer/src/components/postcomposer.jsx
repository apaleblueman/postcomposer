import { useState } from "react";
import EnforceRules from "./rulesEnforcer";
import { platformRules } from "./rulesEnforcer";
import "../assets/PostComposer.css"

function DeterminePlatform(selectedPlatforms){
    const sum =selectedPlatforms.reduce((a, b) => a + b, 0)
    return sum;
}        
function ValidatePost(text, selectedPlatforms){
    const errorArray = [];
    if(selectedPlatforms.length<=0){
        errorArray.push("No platforms selected!")
    }
    if(text.length < 1){
                        errorArray.push("Write Something !")
    }
    else{
        const platformNumber  = DeterminePlatform(selectedPlatforms);
        // console.log("EnforceRules returned:", EnforceRules(text, platformNumber));
        // console.log("errorArray is now:", errorArray);
        errorArray.push(...EnforceRules(text, platformNumber));
    }
    // console.log(typeof(errorArray))

    return errorArray;
}
function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const errorArray = ValidatePost(postText, selectedPlatforms);
    const hasErrors = errorArray.length>0;
    const isReady = (hasErrors==false) && (postText.length>0);
    const displayList = errorArray.map((error)=><li>{error}</li>);

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
                        <textarea rows="20" cols="90" value={postText} 
                        onChange={(e)=> setPostText(e.target.value)} 
                        className={hasErrors && postText.length >= 0 ? 'has-error':'ready'}>
                        
                        </textarea>
                </div>
                <div className="charactersList">
                        {selectedPlatforms.map((plt)=>{
                            if(plt == 1){
                                return <p className={postText.length >= platformRules.twitter.maxChars ? 'overflow':'underflow'}><img className="favicon" src="https://x.com/favicon.ico" alt="X"/>:{postText.length}/{platformRules.twitter.maxChars}</p>
                            }
                            if(plt == 3){return <p className={postText.length >= platformRules.instagram.maxChars ? 'overflow':'underflow'}><img className="favicon" src="https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico" alt="IG"/>:{postText.length}/{platformRules.instagram.maxChars}</p>}
                            if(plt == 5){return <p className={postText.length >= platformRules.facebook.maxChars ? 'overflow':'underflow'}><img className="favicon" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/ay1hV6OlegS.ico" alt="FB"/>:{postText.length}/{platformRules.facebook.maxChars}</p>}
                        })}
                </div>
                <div className="errors">
                    <ul>{displayList}</ul>
                </div>
            </form>
        </div>
    )
}

export default PostComposer;