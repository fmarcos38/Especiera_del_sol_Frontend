import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosCliente, buscaClientePorCuit } from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import ModalRemito from '../ModalRemito';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';

function ListaRemitosCliente() {
    const remitosCliente = useSelector(state => state.remitosCliente); 
    const {cuit} = useParams(); 
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();
    
    const handleClick = () => {
        contexto.setModalRemito(true);
    };
    const handleClickEditar = () => {
        contexto.setModalRemito(true);
    };

    useEffect(()=>{
        dispatch(getRemitosCliente(cuit));
        dispatch(buscaClientePorCuit(cuit));
    },[cuit, dispatch]);


    return (
        <div className="cont-listaRemitosCliente">
            {
                remitosCliente ? (
                    <div className="cont-segundo">
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>N° Remito</th>
                                    <th>Fecha creación</th>
                                    <th>Cuit</th>
                                    <th>Condición Pago</th>
                                    <th>Estado</th>
                                    <th>Detalle</th>
                                    <th>Edita</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    remitosCliente?.map(r => (
                                        <tr key={r._id}>
                                            <td>{r.numRemito}</td>
                                            <td>{r.fecha}</td>
                                            <td>{r.cuit}</td>
                                            <td>{r.condicion_pago}</td>
                                            <td>{r.estado}</td>
                                            <td>
                                                {
                                                    <Link to={`/detalleRemito/${r._id}`}>
                                                        <button onClick={() => { handleClick() }}>Detalle</button>
                                                    </Link>
                                                }
                                            </td>
                                            <td style={{ width: '50px' }}>
                                                <Link to='/editaRemito'>
                                                    <button
                                                        onClick={() => handleClickEditar()}
                                                        className='btn-edita-cliente'
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <h1>No remitos para dicho cliente!!</h1>
                    </>
                )
            }
        </div>
    )
}

export default ListaRemitosCliente