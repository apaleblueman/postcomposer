//rule objects
const platformRules = {
  twitter: {
    maxChars: 280,
    minChars: 1,
    requiresHashtag: false,
    
  },
  instagram: {
    maxChars: 2200,
    minChars: 1,
    requiresHashtag: true,
    
  },
  facebook: {
    maxChars: 63206,
    minChars: 1,
    requiresHashtag: false,
    
  }
};

function EnforceRules(text,platformNumber){
    const rulesArray = [];
    switch(platformNumber){
                case 1:
                    //X only";
                    if(text.length < platformRules.twitter.minChars){
                        rulesArray.push("Twitter:Your post needs more characters")
                    }if(text.length > platformRules.twitter.maxChars){
                        rulesArray.push("Twitter:Your post needs less characters")
                    }if(!text.includes('#')){
                        rulesArray.push("Twitter:Use hashtags to get better reach on X")
                    }
                    break;
                case 3:
                    //insta only";
                    if(text.length < platformRules.instagram.minChars){
                        rulesArray.push("instagram:Your post needs more characters")
                    }if(text.length > platformRules.instagram.maxChars){
                        rulesArray.push("instagram:Your post needs less characters")
                    }if(!text.includes('#')){
                        rulesArray.push("instagram:Use hashtags to get better reach on X")
                    }
                    break;
                case 5:
                    //FB only";
                    if(text.length < platformRules.facebook.minChars){
                        rulesArray.push("facebook:Your post needs more characters")
                    }if(text.length > platformRules.facebook.maxChars){
                        rulesArray.push("facebook:Your post needs less characters")
                    }if(!text.includes('#')){
                        rulesArray.push("facebook:Use hashtags to get better reach on X")
                    }
                    break;
                case 6:
                    //X and FB only";
                    if(text.length < platformRules.twitter.minChars){
                        rulesArray.push("Twitter:Your post needs more characters")
                    }if(text.length > platformRules.twitter.maxChars){
                        rulesArray.push("Twitter:Your post needs less characters")
                    }if(!text.includes('#')){
                        rulesArray.push("Twitter:Use hashtags to get better reach on X")
                    }if(text.length < platformRules.facebook.minChars){
                        rulesArray.push("facebook:Your post needs more characters")
                    }if(text.length > platformRules.facebook.maxChars){
                        rulesArray.push("facebook:Your post needs less characters")
                    }if(!text.includes('#')){
                        rulesArray.push("facebook:Use hashtags to get better reach on X")
                    }
                    break;
                case 8:
                    //insta and FB only";
                    break;
                case 4:
                    //X and insta only";
                    break;
                case 9:
                    //all 3 platforms";
                    break;
                default:
                    console.log("something went wrong");
                    break;
    
            }
            return rulesArray;
}

export default EnforceRules;