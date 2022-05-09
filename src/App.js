import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import "./App.css";
import Layout from "./components/layout/Layout";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout user={user}>
          <Routes>
            <Route exact path="/" element={user ? <Home /> : <Register />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/messenger"
              element={user ? <Messenger /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:username"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

// what to do here //////////////////////////////////////////////////////

// 1. refabricate components (FE) (login/logout)

// 2. redesign app (FE) // add responsive

// 3. add firebase (or another cloud) for image store

// 4. add edit profile info handlers

// 5. add better user verification JWT (BE/FE)

// 5. add searching between people (add functionality in case user is looking for another user without registration)

// ***** CHAT

// 6. add new chat handlers options

// 7. add notifications

//    *Solve this fucking errors in Rightbar

//    *Add real time follower changes

//    *Add proxy

//    *create git repo and deploy

// LAST show whole picture, delite post, add/delete comments
