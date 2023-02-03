import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Videos from "./pages/videos/Videos";
import HomeIcon from "@mui/icons-material/Home";
import { Instagram } from "@mui/icons-material";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import MessageIcon from "@mui/icons-material/Message";

function App() {
  const loggedId = localStorage.getItem("insta-by-aman-id");
  return (
    <div className="app__body">
      <Routes>
        <Route path="/" exact element={<Videos />} />
        <Route path="login" exact element={<Login />} />
        <Route path="home/:profileid" exact element={<Home />} />
        <Route path="chat" exact element={<Chat />} />
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
            <Link to="chat">
              <BottomNavigationAction icon={<MessageIcon />} />
            </Link>
            <Link to="/">
              <BottomNavigationAction icon={<Instagram />} />
            </Link>
            <Link to={`/home/${loggedId}`}>
              <BottomNavigationAction icon={<HomeIcon />} />
            </Link>
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}

export default App;
