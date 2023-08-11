import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import ArtistDashboard from "./components/Dashboard/ArtistDashboard";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import Artists from "./components/Artists/Artist";
import Music from "./components/Music/Music";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path="" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="artists" element={<Artists />} />
          <Route path="music" element={<Music />} />
        </Route>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/artist" element={<ArtistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
