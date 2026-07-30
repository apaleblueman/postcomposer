import { useState } from "react";
import "../assets/platformInfo"
//rule objects
export const platformRules = {                  
  twitter: {
    maxChars: 280,
    minChars: 1,
    requiresHashtag: false
  },
  instagram: {
    maxChars: 2200,
    minChars: 1,
    requiresHashtag: true
    
  },
  facebook: {
    maxChars: 63206,
    minChars: 1,
    requiresHashtag: false
  }
};

function enforceTwitter(text,platformNumber,rulesArray){
        if(text.length < platformRules.twitter.minChars){
            rulesArray.push("🐦️:Your post needs more characters")
        }if(text.length > platformRules.twitter.maxChars){
            rulesArray.push("🐦️:Your post needs less characters")
        }if(!text.includes('#')){
            rulesArray.push("🐦️:Use hashtags to get better reach on X")
        }
}
function enforceInstagram(text,platformNumber,rulesArray){
            if(text.length < platformRules.instagram.minChars){
            rulesArray.push("📸:Your post needs more characters")
            }if(text.length > platformRules.instagram.maxChars){
            rulesArray.push("📸:Your post needs less characters")
            }if(!text.includes('#')){
            rulesArray.push("📸:Use hashtags to get better reach on Instagram")
            }
}
function enforceFacebook(text,platformNumber,rulesArray){
            if(text.length < platformRules.facebook.minChars){
                rulesArray.push("📘:Your post needs more characters")
            }if(text.length > platformRules.facebook.maxChars){
                rulesArray.push("📘:Your post needs less characters")
            }if(!text.includes('#')){
                rulesArray.push("📘:Use hashtags to get better reach on Facebook")
            }
}
function EnforceRules(text,platformNumber){
    const rulesArray = [];
    switch(platformNumber){
                case 1:
                    //X only";
                    enforceTwitter(text,platformNumber,rulesArray);
                    break;
                case 3:
                    //insta only";
                    enforceInstagram(text,platformNumber,rulesArray);
                    break;
                case 5:
                    //FB only";
                    enforceFacebook(text,platformNumber,rulesArray);
                    break;
                case 6:
                    //X and FB only";
                    enforceTwitter(text,platformNumber,rulesArray);
                    enforceFacebook(text,platformNumber,rulesArray);
                    break;
                case 8:
                    //insta and FB only";
                    enforceInstagram(text,platformNumber,rulesArray);
                    enforceFacebook(text,platformNumber,rulesArray);
                    break;
                case 4:
                    //X and insta only";
                    enforceTwitter(text,platformNumber,rulesArray);
                    enforceInstagram(text,platformNumber,rulesArray);
                    break;
                case 9:
                    enforceTwitter(text,platformNumber,rulesArray);
                    enforceInstagram(text,platformNumber,rulesArray);
                    enforceFacebook(text,platformNumber,rulesArray);
                    //all 3 platforms";
                    break;
                default:
                    break;
    
            }
            return rulesArray;
}

export default EnforceRules;