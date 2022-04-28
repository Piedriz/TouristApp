import React from "react";
import ReactDOM from "react-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import { HashRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);
