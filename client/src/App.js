import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CSVManager from "./components/CSVManager/CSVManager";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ManagerDashboard from "./components/Dashboard/ManagerDashboard";
import ArtistDashboard from "./components/Dashboard/ArtistDashboard";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import AddUser from "./components/Users/AddUser";
import Artists from "./components/Artists/Artists";
import Music from "./components/Music/Music";
import AddMusic from "./components/Music/AddMusic";
import User from "./components/Users/User/User";
import AddArtist from "./components/Artists/AddArtist";
import Artist from "./components/Artists/Artist/Artist";
import Unauthorized from "./components/Unauthorized";
import CSVList from "./components/CSVManager/CSVList";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/logout" element={<Logout />}/>
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } >
          <Route path="" element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
              <Home />
            </ProtectedRoute>        
          } />
          <Route path="users" element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="user/:id" element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
              <User />
            </ProtectedRoute>
          } />
          <Route path="artist/:id" element={
              <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
              <Artist />
            </ProtectedRoute>
          } />
          <Route path="artists" element={
            <ProtectedRoute allowedRoles={["admin", "super_admin"]}><Artists /></ProtectedRoute>
          } />
          <Route path="music" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><Music /></ProtectedRoute>} />
          <Route path="createNewUser" element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AddUser /></ProtectedRoute>} />
          <Route path="createNewArtist" element={<ProtectedRoute allowedRoles={["admin"]}><AddArtist /></ProtectedRoute>} />
          <Route path="createNewMusic" element={<ProtectedRoute allowedRoles={["admin"]}><AddMusic /></ProtectedRoute>} />
        </Route>
        <Route path="/manager" element={<ProtectedRoute allowedRoles={["manager"]}><ManagerDashboard /></ProtectedRoute>} >
          <Route path="artists" element={<ProtectedRoute allowedRoles={["manager"]}><Artists /></ProtectedRoute>} />
          <Route path="music" element={<ProtectedRoute allowedRoles={["manager"]}><Music /></ProtectedRoute>} />
          <Route path="createNewArtist" element={<ProtectedRoute allowedRoles={["manager"]}><AddArtist /></ProtectedRoute>} />
          <Route path="artist/:id" element={<ProtectedRoute allowedRoles={["manager"]}><Artist /></ProtectedRoute>} />
          <Route path="csv" element={<ProtectedRoute allowedRoles={["manager"]}><CSVManager /></ProtectedRoute>} />
          <Route path="csvlist" element={<ProtectedRoute allowedRoles={["manager"]}><CSVList /></ProtectedRoute>} />
        </Route>
        <Route path="/artist" element={<ProtectedRoute allowedRoles={["artist"]}><ArtistDashboard /></ProtectedRoute>} >
          <Route path="artists" element={<ProtectedRoute allowedRoles={["artist"]}><Artists /></ProtectedRoute>} />
          <Route path="music" element={<ProtectedRoute allowedRoles={["artist"]}><Music /></ProtectedRoute>} />
          <Route path="createNewMusic" element={<ProtectedRoute allowedRoles={["artist"]}><AddMusic /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
