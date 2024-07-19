import React from 'react';
import './styles.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../Imagenes/logo.png';
import textLogo from '../../Imagenes/texto-logo.png';
import { Link } from 'react-router-dom';

function Footbar() {
    return (
        <footer className='contFooter'>
            <div className="footer">
                <div className='divF'>
                    {/* logo */}
                    <a href='/home'>
                        <img src={logo} alt='' className='logo-footbar' />
                    </a>
                    <ul>
                        {/* Contactanos */}
                        <li>
                            <h2>
                                <p>CONTACTANOS</p>
                            </h2>
                            <p>Cel: 11 41997200 Gustavo</p>
                            <p>Cel: 11 59510493 Florencia</p>
                        </li>
                        {/* Links */}
                        <li>
                            <h2>
                                <p>Links</p>
                            </h2>
                            <div className='divLinks'>
                                <Link to={'/listaDePrecios'} className='link-footbar'>Lista de Precios</Link>
                                <Link to={'/quienesSomos'} className='link-footbar'>Quienes Somos</Link>
                            </div>
                        </li>
                        {/* Redes */}
                        <li>
                            <h2><p>Seguinos</p></h2>
                            <div className='cont-iconos-redes'>
                                <a href='https://www.instagram.com/florm.bienesraices/'>
                                    <InstagramIcon className='icono-redes-foot' />
                                </a>
                                <a href='https://www.facebook.com/especieradelsol'>
                                    <FacebookIcon className='icono-redes-foot' />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>         
        </footer>

    )
}

export default Footbar;