import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Messenger from "./pages/messenger/Messenger";
import "./App.css";
import Layout from "./components/layout/Layout";
import PeopleList from "./pages/PeopleList/PeopleList";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Register />} />
          <Route exact path="/home" element={<Home />} />
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
          <Route
            path="/people"
            element={user ? <PeopleList /> : <Navigate to="/" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// what to do here //////////////////////////////////////////////////////

// 1. refabricate components (FE) (login/logout) --- its hard to change so long code

// 2. redesign app (FE) // add responsive --- design almost done

// 3. add firebase (or another cloud) for image store --- done

// 4. add edit profile info handlers --- im working on it / done

// 5. add better user verification JWT (BE/FE) ***** at the end

// 5. add searching between people (add functionality in case user is looking for another user without registration) -- i guess done

// 6. add pagination --done but bad

// ***** BUGS

// **FIXED** component behavior is different --- absented file id, components must have different id

// **FIXED** dont load pictures --- solved with same solution like previous bug (side-product of this bug)

// ***** CHAT

// 6. add new chat handlers options

// 7. add notifications

//    *Solve this fucking errors in Rightbar

//    *Add real time follower changes

//    *Add proxy

//    *create git repo and deploy

// LAST show whole picture, delete post, add/delete comments
