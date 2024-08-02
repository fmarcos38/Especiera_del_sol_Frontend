import React from 'react';
import './styles.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../Imagenes/logo.png';
import { Link } from 'react-router-dom';

function Footbar() {
    return (
        <footer className='contFooter'>
            <div className="cont-footer">
                <div className='divF'>
                    {/* logo */}
                    <div className='col-logo'>
                        <a href='/home'>
                            <img src={logo} alt='' className='logo-footbar' />
                        </a>
                    </div>
                    <div className='cont-items'>
                        {/* Contactanos */}
                        <div className='col-1'>
                            <h2 className='h2-foot'>
                                <p className='titulo-col'>CONTACTANOS</p>
                            </h2>
                            <p className='info-col'>Cel: 11 41997200 Gustavo</p>
                            <p className='info-col'>Cel: 11 59510493 Florencia</p>
                        </div>
                        {/* Links */}
                        <div className='col-2'>
                            <h2 className='h2-foot'>
                                <p className='titulo-col'>Links</p>
                            </h2>
                            <div className='divLinks'>
                                <Link to={'/listaDePrecios'} className='link-footbar'>Lista de Precios</Link>
                                <Link to={'/quienesSomos'} className='link-footbar'>Quienes Somos</Link>
                            </div>
                        </div>
                        {/* Redes */}
                        <div className='col-3'>
                            <h2 className='h2-foot'>
                                <p className='titulo-col'>Seguinos</p>
                            </h2>
                            <div className='cont-iconos-redes'>
                                <a href='https://www.instagram.com/florm.bienesraices/'>
                                    <InstagramIcon className='icono-redes-foot' />
                                </a>
                                <a href='https://www.facebook.com/especieradelsol'>
                                    <FacebookIcon className='icono-redes-foot' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </footer>

    )
}

export default Footbar;