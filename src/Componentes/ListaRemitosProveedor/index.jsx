import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosProveedor, buscaProveedorPorCuit, resetProv, ordenaPorFechaRemitos } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import TablaCompras from '../TablaCompras';
import './estilos.css';



function ListaRemitosProveedor() {
    const {cuit} = useParams();
    const compras = useSelector(state => state.remitos);
    const proveedor = useSelector(state => state.proveedor);
    const dispatch = useDispatch();
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState(''); 

    //onClick para botones: debe, pagado, fecha+, fecha-, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'fechaMax':
                dispatch(ordenaPorFechaRemitos("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFechaRemitos("fechaMin"));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
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

    useEffect(()=>{
        dispatch(getRemitosProveedor(cuit, "todos", "todos", fechaDesde, fechaHasta));
    },[dispatch, fechaDesde, fechaHasta, cuit]);

    useEffect(()=>{
        dispatch(buscaProveedorPorCuit(cuit));

        return () => {dispatch(resetProv())};
    },[cuit, dispatch]);

    return (
        <div className='cont-lista-remitos-proveedor'>
            {/* filtros */}
            <div className="cont-filtros-lista-remitos-cliente">
                <div className='subCont-filtros-lista-remitos-cliente'>
                    <FiltraDebePago 
                        handleOnClick={handleOnClick}
                        operacion={'proveedor'}
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
            <h2>Proveedor: {proveedor.nombre} {proveedor.apellido}</h2> 
            {/* Tabla */}                    
            <TablaCompras compras={compras} />
        </div>
    )
}

export default ListaRemitosProveedor