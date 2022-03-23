import React, { useContext, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import ModalLogin from "./components/modals/ModalLogin";
import ModalRegister from "./components/modals/ModalRegister";
import Navbar from "./components/Navbar";
import { LoginContext } from "./context/context";
import AddJourney from "./pages/AddJourney";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { API } from "./config/api";
import Detail from "./pages/DetailPost";
import Bookmark from "./pages/Bookmark";
// import page edit profile
import EditProfile from "./pages/EditProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  let navigate = useNavigate();
  const [login, setLogin] = useContext(LoginContext);
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (!state.isLogin) {
      setLogin(false);
      navigate("/");
    } else {
      setLogin(true);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {login ? <Navbar /> : <Jumbotron />}
      <ModalRegister />
      <ModalLogin />
      <Routes>
        <Route exact path="/" element={<Post />} />
        <Route path="/addJourney" element={<AddJourney />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/bookmark" element={<Bookmark />} />
        {/* insert routing page edit profile */}
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;
