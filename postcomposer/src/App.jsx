import PostComposer from "./components/postcomposer";
import { useEffect, useState } from "react";
import "./assets/PostComposer.css";
import Draft from "./components/Draft";

function App() {
  
  // const [drafts, setDraft] = useState(() => {
  //   const saved = localStorage.getItem("drafts");
  //   if (saved) {
  //     try {
  //       return JSON.parse(saved);
  //     } catch (e) {
  //       console.error("Failed to parse drafts:", e);
  //       return [];
  //     }
  //   }
  //   return []; 
  // });

  // const [postText, setPostText] = useState('');
  // const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("drafts", JSON.stringify(drafts));
  // }, [drafts]);

  return (
    <>
      <PostComposer
        // postText={postText}
        // setPostText={setPostText}
        // selectedPlatforms={selectedPlatforms}
        // setSelectedPlatforms={setSelectedPlatforms}
      />
      <Draft
        // drafts={drafts}
        // setDraft={setDraft}
        // postText={postText}
        // setPostText={setPostText}
        // selectedPlatforms={selectedPlatforms}
        // setSelectedPlatforms={setSelectedPlatforms}
      />
    </>
  );
}

export default App;