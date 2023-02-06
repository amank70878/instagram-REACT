import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Videos from "./pages/videos/Videos";
import HomeIcon from "@mui/icons-material/Home";
import { Instagram } from "@mui/icons-material";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import MessageIcon from "@mui/icons-material/Message";
import { ChatBox } from "./pages/chat/ChatBox";
import { useDispatch } from "react-redux";
import { fetchUserByLocalToken } from "./utils/checkUserByToken";

function App() {
  const logged__id = localStorage.getItem("insta-by-aman-id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchedUser, setSearchedUser] = useState([]);

  // search for current logged user with local token
  useEffect(() => {
    dispatch({
      type: "setPageLoader",
      payload: true,
    });
    fetchUserByLocalToken(setSearchedUser, navigate, dispatch);
  }, [navigate]);

  // dispatching the current logged user
  useEffect(() => {
    dispatch({
      type: "setUser",
      payload: searchedUser[0],
    });
  }, [searchedUser, navigate]);

  return (
    <div className="app__body">
      <Routes>
        <Route path="/" exact element={<Videos />} />
        <Route path="login" exact element={<Login />} />
        <Route path="home/:profileid" exact element={<Home />} />
        <Route path="chat" exact element={<Chat />} />
        <Route path="chats/:chatprofileid" exact element={<ChatBox />} />
      </Routes>
      <Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <BottomNavigation>
            <BottomNavigationAction
              icon={<MessageIcon />}
              onClick={() => navigate("chat")}
            />

            <BottomNavigationAction
              icon={<Instagram />}
              onClick={() => navigate("/")}
            />

            <BottomNavigationAction
              icon={<HomeIcon />}
              onClick={() => navigate(`/home/${logged__id}`)}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
