import PostComposer from "./components/postcomposer";
import { useState } from "react";
import "./assets/PostComposer.css"
import Draft from "./components/Draft";
function App() {
  const [postText, setPostText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [drafts, setDraft] = useState([]);
  return (
    <>
    <PostComposer
    postText={postText}
    setPostText={setPostText}
    selectedPlatforms={selectedPlatforms}
    setSelectedPlatforms={setSelectedPlatforms}
    ></PostComposer>
    <Draft
      drafts={drafts}
      postText={postText}
      setPostText={setPostText}
      setDraft={setDraft}
      selectedPlatforms={selectedPlatforms}
      setSelectedPlatforms={setSelectedPlatforms}

    />
    </>
  )
}

export default App;