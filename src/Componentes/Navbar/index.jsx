import React, { useState } from 'react';
import './estilos.css';
import logo from '../../Imagenes/logo.png';
import textLogo from '../../Imagenes/texto-logo.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [muestraMenuClientes, setMuestraMenuClientes] = useState(false); //estado menú cliente
    const [muestraMenuProductos, setMuestraMenuProductos] = useState(false); //estado menú prod
    const [muestraMenuProveedor, setMuestraMenuProveedor] = useState(false); //estado menú proveedor

    const handleMouseEnterCliente = () => {
        setMuestraMenuClientes(true);
    };
    const handleMouseLeaveCliente = () => {
        setMuestraMenuClientes(false);
    };
    const handleMouseEnterProd = () => {
        setMuestraMenuProductos(true);
    };
    const handleMouseLeaveProd = () => {
        setMuestraMenuProductos(false);
    };
    const handleMouseEnterProveedor = () => {
        setMuestraMenuProveedor(true);
    };
    const handleMouseLeaveProveedor = () => {
        setMuestraMenuProveedor(false);
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
                    onMouseEnter={handleMouseEnterCliente}
                    onMouseLeave={handleMouseLeaveCliente}
                >
                    Clientes
                    {
                        muestraMenuClientes && (
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
                {/* Productos */}
                <li 
                    className="navbar-item"
                    onMouseEnter={handleMouseEnterProd}
                    onMouseLeave={handleMouseLeaveProd}
                >
                    Productos
                    {
                        muestraMenuProductos && (
                            <ul className="dropdown-menu">
                                <Link to="/creaProducto" className='link-menu'>
                                    <li className="dropdown-item">Crear Producto</li>
                                </Link>                                
                                <Link to='/productos' className='link-menu'>
                                    <li className="dropdown-item">Listar Productos</li>
                                </Link>
                            </ul>
                        )
                    }
                </li>
                {/* Proveedores */}
                <li 
                    className="navbar-item"
                    onMouseEnter={handleMouseEnterProveedor}
                    onMouseLeave={handleMouseLeaveProveedor}
                >
                    Proveedores
                    {
                        muestraMenuProveedor && (
                            <ul className="dropdown-menu">
                                <Link to="/creaProveedor" className='link-menu'>
                                    <li className="dropdown-item">Crear Proveedor</li>
                                </Link>                                
                                <Link to='/proveedores' className='link-menu'>
                                    <li className="dropdown-item">Listar Proveedores</li>
                                </Link>
                            </ul>
                        )
                    }
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
