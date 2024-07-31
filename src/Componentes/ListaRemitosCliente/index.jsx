import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getRemitosCliente, buscaClientePorCuit, ordenaPorFecha, 
    filtraFechasRemitos, resetCliente 
} from '../../Redux/Actions';
import { Link, useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import {fechaArg, formatMoney} from '../../Helpers/index.js';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import './estilos.css';


function ListaRemitosCliente() {

    const {cuit} = useParams(); 
    const remitosCliente = useSelector(state => state.remitos);
    //estado para el estado del remito
    const [estado, setEstado] = useState("todos");
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();
    


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

    //funcion calc el tot de las entregas
    const calcEntregas = (entregas, estado, totPedido) => {
        let tot=0;

        if(estado === "Pagado"){
            return totPedido;
        }else{
            if(entregas.length !== 0){
                entregas.map(e => {
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
        remitosCliente.map(r => {
            r.entrego.map(e => {
                return tot += e.entrega;
            });
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