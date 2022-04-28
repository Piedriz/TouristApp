import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(){
    return(
        <nav className='teal lighten-2 p'>
            <div className="nav-wrapper container" >
                <a href="#" className="brand-logo">TouristAPP</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
            </div>
        </nav>
    );
}