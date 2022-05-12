import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Navbar(){

    const navigate = useNavigate();

    function signOff(){
        document.cookie = "token=; max-age=0"
        navigate("/login")
    }

    return(
        <nav className='teal lighten-2 p'>
            <div className="nav-wrapper container" >
                <a href="#" className="brand-logo">TouristAPP</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li onClick={signOff}>Cerrar sección</li>
                        <li><Link to="/login">Perfil</Link></li>
                        <li><a href="collapsible.html">Home </a></li>
                    </ul>
            </div>
        </nav>
    );
}