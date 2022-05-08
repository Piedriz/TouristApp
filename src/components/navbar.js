import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(){
    return(
        <nav className='teal lighten-2 p'>
            <div className="nav-wrapper container" >
                <a href="#" className="brand-logo">TouristAPP</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Cerrar sección</Link></li>
                        <li><Link to="/login">Perfil</Link></li>
                        <li><a href="collapsible.html">Home</a></li>
                    </ul>
            </div>
        </nav>
    );
}