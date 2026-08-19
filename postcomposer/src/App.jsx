import PostComposer from "./components/postcomposer";
import { use, useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { setDrafts } from "./store/draftsSlice";
import "./assets/PostComposer.css";
import Draft from "./components/Draft";
import Login from "./components/Login";

function App() {

  useEffect(() => {
    if(localStorage.getItem("jwtToken") !== null){
      setIsLoggedIn(true);
    }
  },[]);
  const dispatch = useDispatch();
  const drafts = useSelector((state)=>state.drafts.drafts)

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  },[drafts]);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
     return (
    isLoggedIn ?
    <>
    <PostComposer
    setIsLoggedIn={setIsLoggedIn}
    />
    <Draft/>
    </>:<Login
    setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default App;