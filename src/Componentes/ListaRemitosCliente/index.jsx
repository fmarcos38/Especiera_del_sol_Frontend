import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getRemitosCliente, buscaClientePorCuit, ordenaPorFecha, 
    filtraFechasRemitos, resetCliente 
} from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import {fechaArg} from '../../Helpers/index.js';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import './estilos.css';


function ListaRemitosCliente() {
    const remitosCliente = useSelector(state => state.remitos); 
    const {cuit} = useParams(); 
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();
    //estado para el estado del remito
    const [estado, setEstado] = useState("todos");
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState(''); 

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
    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };
    const handleOnSubFechas = (e) => {
        e.preventDefault();
        if(!fechaDesde && !fechaHasta){
            Swal.fire({
                text: "Ingrese ambas fechas",
                icon: "error"
            });
        }
        
        const fechas = {
            fechaDesde: fechaDesde, 
            fechaHasta: fechaHasta
        }
        
        dispatch(filtraFechasRemitos(fechas));
    };
    //calcula el total de todos los remitos
    const totRemitos = () => {
        let tot = 0;
        remitosCliente.map(r => {
            tot = tot + r.totPedido;
            return tot;
        });
        return tot;
    };

    useEffect(()=>{
        dispatch(getRemitosCliente(cuit, estado));
        dispatch(buscaClientePorCuit(cuit));

        return () => {dispatch(resetCliente())};
    },[cuit, dispatch, estado]);


    return (
        <div className="cont-listaRemitosCliente">
            {/* filtros */}
            <div className="cont-filtros-btnTeset-lista-remitos-proveedor">
                <div className='cont-filtros-lista-remitos-proveedor'>
                    <FiltraDebePago 
                        handleOnClick={handleOnClick}
                    />
                    <FiltrosComprasVentasFecha  
                        handleOnSubFechas={handleOnSubFechas} 
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                    />
                </div>
                <div className='cont-btnReset-lista-remitos-proveedor'>
                    <BotonResetFiltros handleOnClick={handleOnClick} />
                </div>
            </div>

            {/* TABLA */}
            {
                remitosCliente ? (
                    <div className="cont-segundo">
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th style={{width: '80px'}}>N° Remito</th>
                                    <th>Fecha creación</th>
                                    <th>Cuit</th>
                                    <th>Condición Pago</th>
                                    <th>Estado</th>
                                    <th>Detalle</th>
                                    <th>Tot. Remito $</th>
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
                                            <td>{r.totPedido}</td>
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
                            <tfoot>
                                <td>TOTAL</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{totRemitos()}</td>
                                <td></td>
                            </tfoot>
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