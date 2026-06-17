import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AlumniDirectory from "./pages/AlumniDirectory";
import Layout from "./Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication (no Navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected (show Navbar via Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alumni" element={<AlumniDirectory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;