import { useState } from "react";


//rule objects
const platformRules = {
  twitter: {
    maxChars: 280,
    minChars: 1,
    requiresHashtag: false,
    label: "X (Twitter)"
  },
  instagram: {
    maxChars: 2200,
    minChars: 1,
    requiresHashtag: true,
    label: "Instagram"
  },
  facebook: {
    maxChars: 63206,
    minChars: 1,
    requiresHashtag: false,
    label: "Facebook"
  }
};
function DeterminePlatform(selectedPlatforms){
    const sum =selectedPlatforms.reduce((a, b) => a + b, 0)
    return sum;
}
function ValidatePost(text, selectedPlatforms){
    if(selectedPlatforms.length<=0){
        return "No platforms selected!"
    }else{
        const platformNumber  = DeterminePlatform(selectedPlatforms);
        switch(platformNumber){
            case 1:
                console.log("X only");
                break;
            case 3:
                console.log("insta only");
                break;
            case 5:
                console.log("FB only");
                break;
            case 6:
                console.log("X and FB only");
                break;
            case 8:
                console.log("insta and FB only");
                break;
            case 4:
                console.log("X and insta only");
                break;
            case 9:
                console.log("all 3 platforms");
                break;
            default:
                console.log("something went wrong");
                break;

        }
    }
}

function PostComposer(){
    const [postText, setPostText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const foundErrors = ValidatePost(postText, selectedPlatforms);
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
                        <textarea rows="30" cols="50" value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                        <p>Characters:{postText.length}</p>
                </div>
                <div className="errors">
                    <p className="errorMsg">{foundErrors}</p>
                </div>
            </form>
        </div>
    )
}

export default PostComposer;