import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds, getAllRemitos, ordenaPorFecha} from '../../Redux/Actions';
import TablaVentas from '../TablaVentas';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import SearchOperacionesCliente from '../SearchOperacionesCliente';
import './estilos.css';

function ListaRemitosVentas() {

    const ventas = useSelector(state => state.remitosVentas);
    const [remitos, setremitos] = useState([]);
    const [estado, setEstado] = useState("todos");
    const [cliente, setCliente] = useState('');
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const dispatch = useDispatch();

    
    //para filtro de fechas 
    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };    
    //para botones debe pagado fecha mas, fecha menos
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                setEstado("Debe");
                dispatch(getAllRemitos("Debe", fechaDesde, fechaHasta));
                break;
            case 'pagado':
                setEstado("Pagado");
                dispatch(getAllRemitos("Pagado", fechaDesde, fechaHasta));
                break;
            case 'fechaMax':
                dispatch(ordenaPorFecha("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFecha("fechaMin"));
                break;
            case 'todos':
                setEstado("todos");
                dispatch(getAllRemitos( estado, fechaDesde, fechaHasta));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
                setEstado("todos");
                dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
                break;
            default:
                break; 
            
        }
    };
    //actualizo estado cliente -> para luego en el useEffect utilizarlo
    const onChangeCliente =  (e) => {
        setCliente(e.target.value);
    };

    //efecto para la busqda de remitos de un cliente
    useEffect(()=>{
        if(cliente){
            setremitos(ventas.filter(r => r.cliente.toLowerCase().includes(cliente.toLowerCase())));
        }else{
            setremitos(ventas);
        }
    },[cliente, ventas]);
    
    useEffect(() => {
        dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
        dispatch(getAllProds());
    }, [dispatch, estado, fechaDesde, fechaHasta,]);


    return (
        <div className='cont-lista-remitos-ventass'>
            <h1 className='titulo-pagina-ventas'>Lista de Ventas</h1>
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
            {/* searchbar */}
            <SearchOperacionesCliente cliente={cliente} onChangeCliente={onChangeCliente} />
            {/* lista ventas */}
            <TablaVentas 
                ventas={remitos}
            />
        </div>
    )
}

export default ListaRemitosVentas