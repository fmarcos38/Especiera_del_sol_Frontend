import React from 'react'
import './estilos.css';
import logo from '../../Imagenes/logo.png';
import textLogo from '../../Imagenes/texto-logo.png';
import { Link } from 'react-router-dom';



function Navbar() {
    return (
        <div className='cont-head'>
            <div className='cont-izq'>
                <Link to='/' className='cont-izq'>
                    <img src={logo} alt='' className='logo'/>
                    <img src={textLogo} alt='' className='texto-logo'/>
                </Link>
            </div>
            <div className='cont-der'>
                <ul>
                    <Link to='/clientes' className='link-menu'>
                        <li>Clientes</li>
                    </Link>
                    <Link to='/productos' className='link-menu'>
                        <li>Productos</li>
                    </Link>
                    <Link to='/remitos' className='link-menu'>
                        <li>Remitos</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar