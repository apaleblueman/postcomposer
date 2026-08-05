import PostComposer from "./components/postcomposer";
import { use, useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { setDrafts } from "./store/draftsSlice";
import "./assets/PostComposer.css";
import Draft from "./components/Draft";

function App() {
  const dispatch = useDispatch();
  const drafts = useSelector((state)=>state.drafts.drafts)

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  },[drafts]);

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