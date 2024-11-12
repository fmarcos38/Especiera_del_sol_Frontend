import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosCliente, buscaClientePorCuit, resetCliente, ordenaPorFechaRemitos } from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import {fechaArg, formatMoney} from '../../Helpers/index.js';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';


function ListaRemitosCliente() {

    const {cuit} = useParams();
    const remitosCliente = useSelector(state => state.remitos);
    const cliente = useSelector(state => state.cliente);
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();

    const handleClickDetalle = () => {
        contexto.setModalRemito(true);
    };
    const handleClickEditar = () => {
        contexto.setModalRemito(true);
    };

    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getRemitosCliente(cuit, "Debe", fechaDesde, fechaHasta));
                break;
            case 'pagado':
                dispatch(getRemitosCliente(cuit, "Pagado", fechaDesde, fechaHasta));
                break;
            case 'fechaMax':
                dispatch(ordenaPorFechaRemitos("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFechaRemitos("fechaMin"));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
                dispatch(getRemitosCliente(cuit, "todos", fechaDesde, fechaHasta));
                break;
            case 'todos':
                dispatch(getRemitosCliente(cuit, "todos", fechaDesde, fechaHasta));
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

    //funcion calc el tot de las entregas
    const calcEntregas = (entregas, estado, totPedido) => {
        let tot=0;

        if(estado === "Pagado"){
            return totPedido;
        }else{
            if(entregas?.length !== 0){
                entregas?.map(e => {
                    return tot += e.entrega; 
                });
            }
        }

        return tot;
    };
    //funcion calcula las entregas y resta del saldo
    const calculaSaldo = (tot, entregas, estado) =>{
        let saldo = 0;

        if(estado === "Pagado"){
            return saldo;
        }else{
            const totEntregas = calcEntregas(entregas);
            saldo = tot - totEntregas;
            return saldo;
        }
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
    //funcion calc el tot de los saldos 
    const totSaldos = () => {
        let tot = 0; 
        remitosCliente.map(r => {
            return tot += calculaSaldo(r.totPedido, r.entrego, r.estado); 
        });
        return tot;
    };
    //funcion calc el tot de entregas
    const totEntregas = () => {
        let tot = 0;
        remitosCliente?.map(r => {
            r.entrego?.map(e => {
                return tot += e.entrega;
            });
            return tot;
        });
        return tot;
    };

    
    useEffect(()=>{
        dispatch(getRemitosCliente(cuit, "todos", fechaDesde, fechaHasta));
    },[cuit, dispatch, fechaDesde, fechaHasta]);

    useEffect(()=>{
        dispatch(buscaClientePorCuit(cuit));

        return () => {dispatch(resetCliente())};
    },[cuit, dispatch]);


    return (
        <div className="cont-listaRemitosCliente">
            {/* filtros */}
            <div className="cont-filtros-lista-remitos-cliente">
                <div className='subCont-filtros-lista-remitos-cliente'>
                    <FiltraDebePago 
                        handleOnClick={handleOnClick}
                        operacion={'venta'}
                    />
                    <FiltrosComprasVentasFecha
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                    />
                </div>
                <div className='cont-btnReset-lista-remitos-cliente'>
                    <BotonResetFiltros handleOnClick={handleOnClick} />
                </div>
                <h2 className='mensj-mes-actual'>Si no se filtra por Fecha, muestra el mes Actual !!</h2>
            </div>

            {/* Nombre del cliente */}
            <h2>Cliente: {cliente.nombreApellido}</h2>
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
                                    <th>Tot. Remito $</th>
                                    <th>Entregó</th>
                                    <th>Saldo</th>
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
                                            <td>{formatMoney(r.totPedido)}</td>
                                            <td>{formatMoney(calcEntregas(r.entrego))}</td>
                                            <td className={calculaSaldo(r.totPedido, r.entrego, r.estado) > 0  ? 'debe' : 'pagado'}>{formatMoney(calculaSaldo(r.totPedido, r.entrego, r.estado))}</td>
                                            <td className={r.estado === 'Debe' ? 'debe' : 'pagado'}>{r.estado}</td>                                            
                                            <td>
                                                {
                                                    <Link to={`/detalleRemitoVenta/${r._id}`}>
                                                        <button 
                                                            type='button' 
                                                            onClick={() => { handleClickDetalle() }}
                                                        >
                                                            Detalle
                                                        </button>
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
                            <tfoot>
                                <td>TOTALES</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totRemitos())}</td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totEntregas())}</td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totSaldos())}</td>                                
                                <td></td>
                                <td></td>
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