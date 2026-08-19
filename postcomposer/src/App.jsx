import PostComposer from "./components/postcomposer";
import { use, useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { setDrafts } from "./store/draftsSlice";
import "./assets/PostComposer.css";
import Draft from "./components/Draft";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();
  const drafts = useSelector((state)=>state.drafts.drafts)

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  },[drafts]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
     return (
    isLoggedIn ?
    <>
    <PostComposer/>
    <Draft/>
    </>:<Login
    />
  );
}

export default App;