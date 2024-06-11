import React, { useState } from 'react';
import './estilos.css';
import logo from '../../Imagenes/logo.png';
import textLogo from '../../Imagenes/texto-logo.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [showClientsMenu, setShowClientsMenu] = useState(false);

    const handleMouseEnter = () => {
        setShowClientsMenu(true);
    };

    const handleMouseLeave = () => {
        setShowClientsMenu(false);
    };

    return (
        <nav className="navbar">
            {/* logo */}
            <div className='cont-izq'>
                <Link to='/' className='cont-izq'>
                    <img src={logo} alt='' className='logo'/>
                    <img src={textLogo} alt='' className='texto-logo'/>
                </Link>
            </div>
            <ul className="navbar-menu">
                <li
                    className="navbar-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Clientes
                    {
                        showClientsMenu && (
                            <ul className="dropdown-menu">
                                <Link to="/creaCliente" className='link-menu'>
                                    <li className="dropdown-item">Crear Cliente</li>
                                </Link>                                
                                <Link to='/clientes' className='link-menu'>
                                    <li className="dropdown-item">Listar Clientes</li>
                                </Link>                                
                            </ul>
                        )
                    }
                </li>
                <li className="navbar-item">Proveedores</li>
            </ul>
        </nav>
    );
};

export default Navbar;
