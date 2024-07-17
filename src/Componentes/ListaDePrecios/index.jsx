import React, { useEffect } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import logo from '../../Imagenes/logo.png';
import textoLogo from '../../Imagenes/texto-logo.png';

function ListaDePrecios() {
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProds())
    }, [dispatch]);

    return (
        <div className="cont-gral-listaDePrecios">
            <div className='cont-secundario-listaDePrecios'>
                <div className="linea linea-1"></div>
                <div className="linea linea-2"></div>
                <div className="linea linea-3"></div>
                <div className='cont-informacion'>
                    {/* logo y datos */}
                    <div className='cont-logo-datos'>
                        <div className='cont-logo'>
                            <img src={logo} alt='not found' className='logo-lista-precio' />
                        </div>
                        <div className='datos-empresa'>
                            <img src={textoLogo} alt='not found' className='textoLogo-lista-precio' />
                        </div>
                    </div>
                    {/* titulo */}
                    <div className='cont-titulo-lista-precio'>
                        <h1>LISTA DE PRECIOS MAYORISTA</h1>
                    </div>
                    {/* tabla */}
                    <div>
                        <table className='tabla-precios'>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Precio (x Kg)</th>
                                    <th>Envace (Kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productos?.map((p,i) => {
                                        return(
                                            <tr key={i}>
                                                <td>{p.nombre}</td>
                                                <td>{p.precioKg}</td>
                                                <td>{p.envase}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaDePrecios