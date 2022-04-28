import React from "react";
import ReactDOM from "react-dom";
import Admin from "./admin";
import Login from "./pages/login";
import { HashRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);
