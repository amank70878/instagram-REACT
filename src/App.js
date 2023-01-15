import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Videos from "./pages/videos/Videos";
import HomeIcon from "@mui/icons-material/Home";
import { VideoCall } from "@mui/icons-material";
import Login from "./pages/login/Login";

function App() {
  // eslint-disable-next-line
  const [loginUserEmail, setLoginUserEmail] = useState("");

  useEffect(() => {
    setLoginUserEmail(localStorage.getItem("loggedInInstagramCloneEmail"));
  }, []);

  var hours = 2; // to clear the localStorage after 1 hour
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("instaLoginTime");
  if (setupTime == null) {
    localStorage.setItem("instaLoginTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("instaLoginTime", now);
    }
  }

  return (
    <BrowserRouter>
      <div className="app__body">
        {loginUserEmail ? (
          <Login />
        ) : (
          <>
            <Routes>
              <Route path="/" exact element={<Videos />} />
              <Route path="home/" exact element={<Home />} />
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
                  <Link to="/">
                    <BottomNavigationAction icon={<VideoCall />} />
                  </Link>
                  <Link to="home/">
                    <BottomNavigationAction icon={<HomeIcon />} />
                  </Link>
                </BottomNavigation>
              </Paper>
            </Box>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
