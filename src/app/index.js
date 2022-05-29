import React from "react";
import ReactDOM from "react-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import { HashRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Home from './pages/home'
import SiteDetails from './pages/sitedetails'
import Perfil from './pages/perfil'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/:id" element={<SiteDetails/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);
