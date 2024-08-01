import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras, ordenaFechaCompras } from '../../Redux/Actions';
import TablaCompras from '../TablaCompras';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import Swal from 'sweetalert2';
import './estilos.css';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitosCompras);
    const [detalle, setDetalle] = useState("todas");
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
    const handleOnSubFechas = (e) => {
        e.preventDefault();
        if(!fechaDesde && !fechaHasta){
            Swal.fire({
                text: "Ingrese ambas fechas",
                icon: "error"
            });
        }        
        dispatch(getAllCompras(detalle, fechaDesde, fechaHasta)); //filtraFechasRemitosCompras
    };
    //para botones debe pagado fecha mas, fecha menos, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                setDetalle("Compra");
                dispatch(getAllCompras(detalle, fechaDesde, fechaHasta)); 
                break;
            case 'pagado':
                setDetalle("Anticipo");
                dispatch(getAllCompras(detalle, fechaDesde, fechaHasta)); 
                break;
            case 'fechaMax':
                dispatch(ordenaFechaCompras("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaFechaCompras("fechaMin"));
                break;
            case 'ambos':
                setDetalle("todas");
                dispatch(getAllCompras(detalle, fechaDesde, fechaHasta));
                break;
            case 'mesActual':
                setDetalle("todas");
                dispatch(getAllCompras(detalle, fechaDesde, fechaHasta));
                break;
            case 'borraFechas':
                setFechaDesde("");
                setFechaHasta("");
                break;
            default:
                break; 
            
        }
    };

    useEffect(()=>{
        dispatch(getAllCompras(detalle, fechaDesde, fechaHasta));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, detalle, /* fechaDesde, fechaHasta */]);//al poner las fechas aquí, cambian sin click del btn


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha 
                        handleOnSubFechas={handleOnSubFechas}
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