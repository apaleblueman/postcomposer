import { useState } from "react";
import EnforceRules from "./rulesEnforcer";
import { platformRules } from "./rulesEnforcer";
import "../assets/PostComposer.css"
import "../assets/platformInfo"
import { platformInfo } from "../assets/platformInfo";
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
        if(text.length>0 && selectedPlatforms.length>0 && errorArray.length<1){
            errorArray.push("Looks like your post is ready!");
            console.log(errorArray.length)
    }
    }
    // console.log(typeof(errorArray))

    return errorArray;
}
function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const errorArray = ValidatePost(postText, selectedPlatforms);
    const hasErrors = errorArray.length>0;
    const isReady = postText.length>=0 && errorArray.includes("Looks like your post is ready!") ;
    const displayList = errorArray.map((error)=><li>{error}</li>);

    // console.log(foundErrors);
    return(
        <div>
            <div className="heading">
            <h1>PostComposer</h1>
            <a className="link" href="https://github.com/apaleblueman/postcomposer">source code</a>
            </div>
            <p className="userchoice">Choose social media platform where u wish to post:</p>
            <form>
                <div className="platforms">
                    <div><label><img className="favicon" src={platformInfo[1].icon}/></label>
                    <input type="checkbox" id="twitter" name="1" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input></div>
                    <div><label><img className="favicon" src={platformInfo[3].icon}/></label>
                    <input type="checkbox" id="instagram" name="3" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input></div>
                    <div><label><img className="favicon" src={platformInfo[5].icon}/></label>
                    <input type="checkbox" id="Facebook" name="5" onChange={(e)=>{
                        if(e.target.checked){
                            setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)])
                        }else{
                            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name)))
                        }
                        }}></input></div>
                </div>
                <div className="userPost">
                        <textarea rows="7" cols="50" value={postText} 
                        onChange={(e)=> setPostText(e.target.value)} 
                        className={hasErrors && postText.length >= 0 ? 'has-error':'ready'}>
                        
                        </textarea>
                </div>
                <div className="charactersList">
                        {selectedPlatforms.map((plt)=>{
                            const info = platformInfo[plt];
                            if (!info) return null;
                            const isOver = postText.length > info.maxChars;
                            const counterClass = isOver ? 'overflow' : 'underflow';
                            return <p key={plt} className={counterClass}>
                                   <img className="favicon" src={info.icon} alt={info.name}/>:{postText.length}/{info.maxChars}
                                   </p>
                        })}
                </div>
                <div className={isReady?'readyPost':'errors'}>
                    <ul>{displayList}</ul>
                    
                </div>
            </form>
        </div>
    )
}

export default PostComposer;