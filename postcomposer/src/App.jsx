import PostComposer from "./components/postcomposer";
import { use, useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { setDrafts } from "./store/draftsSlice";
import "./assets/PostComposer.css";
import Draft from "./components/Draft";
import Login from "./components/Login";
import { login } from "./store/authSlice";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";



function App() {

  // useEffect(() => {
  //   if(localStorage.getItem("jwtToken") !== null){
  //     // setIsLoggedIn(true);
  //     const rawToken = localStorage.getItem("jwtToken");
  //     const splitToken = atob(rawToken.split(".")[1]);
  //     const tokenOBJ = JSON.parse(splitToken);
  //     dispatch(login({role:tokenOBJ.role,token:rawToken}))
  //   }
  // },[]);
  const dispatch = useDispatch();
  const drafts = useSelector((state)=>state.drafts.drafts)

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  },[drafts]);


  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  
  //    return (
  //   isLoggedIn ?
  //   <>
  //   <PostComposer/>
  //   <Draft/>
  //   </>:<Login/>
  // );

  return <HashRouter>
    <Routes>
      <Route
      path="/"
      element={<Login/>}
      />
      <Route
      path="/postcomposer"
      element={
        <ProtectedRoutes allowedRoles={["Admin", "Editor", "Viewer"]}>
          <><PostComposer/>
          <Draft/></>
        </ProtectedRoutes>
      }
      />
    </Routes>
  </HashRouter>
}

export default App;