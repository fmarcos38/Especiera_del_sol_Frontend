import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosProveedor, filtraFechasRemitos, ordenaPorFecha } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import TablaCompras from '../TablaCompras';
import Swal from 'sweetalert2';
import './estilos.css';



function ListaRemitosProveedor() {
    const {cuit} = useParams();
    const compras = useSelector(state => state.remitos);
    const dispatch = useDispatch();
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState(''); 

    //onClick para botones: debe, pagado, fecha+, fecha-, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getRemitosProveedor(cuit, "Compra", "todos", fechaDesde, fechaHasta));
                break;
            case 'pagado':
                dispatch(getRemitosProveedor(cuit, "Anticipo", "Pago", fechaDesde, fechaHasta));
                break;
            case 'fechaMax':
                dispatch(ordenaPorFecha("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFecha("fechaMin"));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
                dispatch(getRemitosProveedor(cuit, "todos", "todos", fechaDesde, fechaHasta));
                break;
            case 'todos':                
                dispatch(getRemitosProveedor(cuit, "todos", "todos", fechaDesde, fechaHasta));
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

    useEffect(()=>{
        dispatch(getRemitosProveedor(cuit, "todos", "todos", fechaDesde, fechaHasta));
    },[dispatch, fechaDesde, fechaHasta, cuit]);


    return (
        <div className='cont-lista-remitos-proveedor'>
            {/* <h1 className='titulo-cont-lista-remitos-proveedor'>Compras realizadas al proveedor {proveedor}</h1> */}
            <div className="cont-filtros-btnTeset-lista-remitos-proveedor">
                <div className='cont-filtros-lista-remitos-proveedor'>
                    <FiltrosComprasVentasFecha  
                        handleOnSubFechas={handleOnSubFechas} 
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                    />
                    <FiltraDebePago handleOnClick={handleOnClick}/>
                </div>
                <div className='cont-btnReset-lista-remitos-proveedor'>
                    <BotonResetFiltros handleOnClick={handleOnClick}/>
                </div>
            </div>    
            {/* titulo */}
            <h2 className='titulo-lista-prov'>Si no se filtra por Fecha, muestra el mes Actual !!</h2>                     
            <TablaCompras compras={compras} />
        </div>
    )
}

export default ListaRemitosProveedor