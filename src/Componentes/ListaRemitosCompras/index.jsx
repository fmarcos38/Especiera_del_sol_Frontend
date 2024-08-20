import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras, ordenaFechaCompras } from '../../Redux/Actions';
import TablaCompras from '../TablaCompras';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import './estilos.css';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitosCompras);
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
    //para botones debe pagado fecha mas, fecha menos, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getAllCompras("Compra", "todos", fechaDesde, fechaHasta)); //detalle, estado
                break;
            case 'pagado':
                dispatch(getAllCompras("Anticipo", "Pago", fechaDesde, fechaHasta)); 
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

    useEffect(()=>{
        dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
    }, [dispatch, fechaDesde, fechaHasta]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            {/* filtros */}
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha 
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                        handleOnClick={handleOnClick}
                    />
                    <FiltraDebePago 
                        operacion={"compra"}
                        handleOnClick={handleOnClick}
                    />
                </div>
                <BotonResetFiltros 
                    handleOnClick={handleOnClick}
                />
            </div>
            <h3 
                style={{margin:'5px', background:'yellow'}}
            >
                SI NO SE UTILIZA EL FILTRO POR FECHA, SE MUESTRAN LOS MOVIMIENTOS DEL MES ACTUAL
            </h3>
            <TablaCompras compras={remitos}/>
        </div>
    )
}

export default ListaRemitos;