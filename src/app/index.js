import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App'
import Allsites from './pages/allsites';
import Login from './pages/login';
import {
    HashRouter,
    Routes,
    Route,
  } from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/home' element={<Allsites/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </HashRouter>,
     document.getElementById('root')
);