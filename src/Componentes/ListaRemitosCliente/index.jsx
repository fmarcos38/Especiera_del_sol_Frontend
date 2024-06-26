import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosCliente, buscaClientePorCuit, ordenaPorFecha } from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';
import { fechaArg } from '../../Helpers';

function ListaRemitosCliente() {
    const remitosCliente = useSelector(state => state.remitosCliente); 
    const {cuit} = useParams(); 
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();
    //estado para el estado del remito
    const [estado, setEstado] = useState("todos");


    const handleClick = () => {
        contexto.setModalRemito(true);
    };
    const handleClickEditar = () => {
        contexto.setModalRemito(true);
    };

    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                setEstado("Debe");
                dispatch(getRemitosCliente(cuit, estado));
                break;
                case 'pagado':
                setEstado("Pagado");
                dispatch(getRemitosCliente(cuit, estado));
                break;
            case 'fechaMax':
                dispatch(ordenaPorFecha("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFecha("fechaMin"));
                break;
            case 'todos':
                setEstado("todos");
                dispatch(getRemitosCliente(cuit, estado));
                break;
            default:
                break; 
            
        }
    };

    useEffect(()=>{
        dispatch(getRemitosCliente(cuit, estado));
        dispatch(buscaClientePorCuit(cuit));
    },[cuit, dispatch, estado]);


    return (
        <div className="cont-listaRemitosCliente">
            {/* filtros */}
            <div className='cont-listaRemitosCliente-filtros'>
            <button id='debe' onClick={(e)=>{handleOnClick(e)}}>Debe</button>
            <button id='pagado' onClick={(e)=>{handleOnClick(e)}}>Pagado</button>
            <button id='fechaMax' onClick={(e)=>{handleOnClick(e)}}>Fecha ⬆️</button>
            <button id='fechaMin' onClick={(e)=>{handleOnClick(e)}}>Fecha ⬇️</button>
            <p>Buscar por Fecha</p>
            <form>
                <label>Desde</label>
                <input type='date' />
                <label>Hasta</label>
                <input type='date' />
            </form>
            <button id='todos' onClick={(e)=>{handleOnClick(e)}}>Resetea Filtros</button>
            </div>
            
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
                                            <td>{fechaArg(r.fecha)}</td>
                                            <td>{r.cuit}</td>
                                            <td>{r.condicion_pago}</td>
                                            <td className={r.estado === 'Debe' ? 'debe' : 'pagado'}>{r.estado}</td>
                                            <td>
                                                {
                                                    <Link to={`/detalleRemito/${r._id}`}>
                                                        <button onClick={() => { handleClick() }}>Detalle</button>
                                                    </Link>
                                                }
                                            </td>
                                            <td style={{ width: '50px' }}>
                                                <Link to={`/editaRemito/${r._id}`}>
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