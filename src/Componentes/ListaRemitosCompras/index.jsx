import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras, ordenaFechaCompras } from '../../Redux/Actions';
import TablaCompras from '../TablaCompras';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import SearchOperacionesProveedor from '../SearchOperacionesProveedor';
import './estilos.css';


function ListaRemitos() {

    const compras = useSelector(state => state.remitosCompras);
    const [remitos, setRemitos] = useState([]);
    const [proveedor, setProveedor] = useState('');
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const dispatch = useDispatch();  

    // Manejo del cambio en el input del proveedor
    const handleOnChangeProveedor = (e) => {
        setProveedor(e.target.value);
    };
    //para filtro de fechas 
    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };  
    //para botones debe pagado fecha mas, fecha menos, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getAllCompras("Compra", "todos", fechaDesde, fechaHasta)); //detalle, estado
                break;
            case 'pagado':
                dispatch(getAllCompras("Pago", "Pago", fechaDesde, fechaHasta)); 
                break;
            case 'fechaMax':
                dispatch(ordenaFechaCompras("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaFechaCompras("fechaMin"));
                break;
            case 'todos':
                dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
                dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
                break;
            default:
                break; 
            
        }
    };

    // Efecto para filtrar remitos por proveedor en tiempo real
    useEffect(() => {
        if (proveedor.trim() !== '') {
            // Filtrar remitos que coincidan con el nombre del proveedor
            setRemitos(compras.filter(r => r.proveedor.toLowerCase().includes(proveedor.toLowerCase())));
        } else {
            // Si no hay proveedor seleccionado, mostrar todos los remitos
            setRemitos(compras);
        }
    }, [proveedor, compras]);

    useEffect(()=>{
        dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
    }, [dispatch, fechaDesde, fechaHasta]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
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

            {/* search */}
            <SearchOperacionesProveedor 
                proveedor={proveedor} 
                handleOnChangeProveedor={handleOnChangeProveedor} 
            />
            <TablaCompras compras={remitos}/>
        </div>
    )
}

export default ListaRemitos;