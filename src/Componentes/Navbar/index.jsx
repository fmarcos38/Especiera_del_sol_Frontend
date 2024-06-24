import React, { useContext, useState } from 'react';
import './estilos.css';
import logo from '../../Imagenes/logo.png';
import textLogo from '../../Imagenes/texto-logo.png';
import { Link } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import { logout } from '../../LocalStorage';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
    const [muestraMenuClientes, setMuestraMenuClientes] = useState(false); //estado menú cliente
    const [muestraMenuProductos, setMuestraMenuProductos] = useState(false); //estado menú prod
    const [muestraMenuProveedor, setMuestraMenuProveedor] = useState(false); //estado menú proveedor
    const [muestraMenuRemitos, setMuestraMenuRemitos] = useState(false); //estado menú remitos
    const contexto = useContext(AppContexto);

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
    const handleMouseEnterRemito = () => {
        setMuestraMenuRemitos(true);
    };
    const handleMouseLeaveRemito = () => {
        setMuestraMenuRemitos(false);
    };
    const handleLogOut = () => {
        logout();
        contexto.setUserLog(null);
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
            {/* items */}
            {
                contexto.userLog ? (
                    <ul className="navbar-menu">
                        {/* clientes */}
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
                        {/* remitos */}
                        <li
                            className="navbar-item"
                            onMouseEnter={handleMouseEnterRemito}
                            onMouseLeave={handleMouseLeaveRemito}
                        >
                            Remitos
                            {
                                muestraMenuRemitos && (
                                    <ul className="dropdown-menu">
                                        <Link to="/creaVenta" className='link-menu'>
                                            <li className="dropdown-item">Crear remito Venta</li>
                                        </Link>
                                        <Link to='/creoRemitoCompra' className='link-menu'>
                                            <li className="dropdown-item">Crear remito Compra</li>
                                        </Link>
                                        <Link to="/listaRemitosVentas" className='link-menu'>
                                            <li className="dropdown-item">Lista remitos Venta</li>
                                        </Link>
                                        <Link to='/listaRemitosCompras' className='link-menu'>
                                            <li className="dropdown-item">Lista remitos Compra</li>
                                        </Link>
                                    </ul>
                                )
                            }
                        </li>
                    </ul>
                ) : (
                    <div className="navbar-menu"></div>
                )
            }
            
            {/* login/logout */}
            {
                !contexto.userLog ? (
                    <div className='cont-der'>
                        <Link to={'/login'}>
                            <LoginIcon />
                        </Link>
                    </div>
                ) : (
                    <div className='cont-der'>
                        <p className='nombre-userLog'>Hola {contexto.userLog.user.nombre}</p>
                        <button onClick={()=>handleLogOut()} className='btn-logout'>
                            <LogoutIcon/>
                        </button>
                    </div>
                )
                
            }
            
        </nav>
    );
};

export default Navbar;
