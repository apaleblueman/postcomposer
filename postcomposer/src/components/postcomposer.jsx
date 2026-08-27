import { useState } from "react";
import EnforceRules from "./rulesEnforcer";
import { platformRules } from "./rulesEnforcer";
import "../assets/PostComposer.css"
import "../assets/platformInfo"
import { platformInfo } from "../assets/platformInfo";
import {CopyToClipboard} from 'react-copy-to-clipboard';
//redux imports
import {useSelector, useDispatch} from 'react-redux';
import { setPostText,setSelectedPlatforms } from "../store/postsSlice";
import { selectCurrentPost, selectSelectedPlatforms } from "../store/postsSlice";


// import Draft from "./Draft";
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
            //console.log(errorArray.length)
    }
    }
    // console.log(typeof(errorArray))

    return errorArray;
}
//attaching tokens to requests
function simulatePublish() {
    const currentToken = localStorage.getItem("jwtToken");
    const simulatedHeaders = {
        "Authorization": `Bearer ${currentToken}`
    };
    console.log("Ready to send to server with headers:", simulatedHeaders);
}
//decode jwt token stored in localStorage
function decodeToken(){
    const currentToken = localStorage.getItem("jwtToken");
    if(currentToken!== null){
        const splitToken = currentToken.split(".");
        const base64string = atob(splitToken[1]);
        const JSONstring = JSON.parse(base64string);
        console.log(JSONstring['username']);
    }
}
function PostComposer({setIsLoggedIn}){
    //dispatch method
    const dispatch = useDispatch();
    //reading data from store
    const postText = useSelector(selectCurrentPost);
    const selectedPlatforms = useSelector(selectSelectedPlatforms);    
    const errorArray = ValidatePost(postText, selectedPlatforms);
    
    const isReady = postText.length>=0 && errorArray.includes("Looks like your post is ready!") ;
    const displayList = errorArray.map((error)=><li>{error}</li>);
    
    const rawToken = localStorage.getItem("jwtToken");
    let displayName = "Guest";
    if(rawToken){
        try{
            const payload = JSON.parse(atob(rawToken.split(".")[1]));
            displayName = payload.username;
        }catch(error){
            console.log("Failed to decode token", error);
        }
    }
    
    // console.log(foundErrors);
    return(
        <div>
            <div className="heading">
            <h1>PostComposer</h1>
            <div className="heading-right">
                <a className="link" href="https://github.com/apaleblueman/postcomposer">source code</a>
                <p>{displayName}</p>
                <button onClick={()=>{
                        localStorage.removeItem("jwtToken");
                        setIsLoggedIn(false);
                }}>Logout</button>
            </div>
            </div>
            <p className="userchoice">Choose social media platform where u wish to post:</p>
            <form>
                <div className="platforms">
                    <div><label><img className="favicon" src={platformInfo[1].icon}/></label>
                    <input type="checkbox" id="twitter" className="checkbox" name="1" onChange={(e)=>{
                        if(e.target.checked){
                            dispatch(setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)]))
                        }else{
                            dispatch(setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name))))
                        }
                        }}></input></div>
                    <div><label><img className="favicon" src={platformInfo[3].icon}/></label>
                    <input type="checkbox" id="instagram" className="checkbox" name="3" onChange={(e)=>{
                        if(e.target.checked){
                            dispatch(setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)]))
                        }else{
                            dispatch(setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name))))
                        }
                        }}></input></div>
                    <div><label><img className="favicon" src={platformInfo[5].icon}/></label>
                    <input type="checkbox" id="Facebook" className="checkbox" name="5" onChange={(e)=>{
                        if(e.target.checked){
                            dispatch(setSelectedPlatforms([...selectedPlatforms, Number(e.target.name)]))
                        }else{
                            dispatch(setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform)=>selectedPlatform!=Number(e.target.name))))
                        }
                        }}></input></div>
                </div>
                <div className="userPost">
                        <textarea rows="7" cols="50" value={postText} 
                        onChange={
                            (e)=> {dispatch(setPostText(e.target.value));
                                // console.log(postText.length>0 && isReady)
                            }
                        } 
                        className={(isReady && postText.length>=0) ? 'ready':'has-error'}>
                        
                        </textarea>
                        <CopyToClipboard text={postText}>
                        <div className="clipboard">
                        <button type="button">Copy to clipboard</button>
                        </div>
                        </CopyToClipboard>
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
            <button onClick={simulatePublish}>Test Publish</button>
            <button onClick={decodeToken}>Test Token</button>
        </div>
    )
}

export default PostComposer;