import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosProveedor, filtraEstadoRemitoCompra,  } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import TablaCompras from '../TablaCompras';
import './estilos.css';



function ListaRemitosProveedor() {
    const compras = useSelector(state => state.remitosProveedor); 
    const {nombre, apellido} = useParams();
    const proveedor = nombre+" "+apellido;
    const dispatch = useDispatch();

    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(filtraEstadoRemitoCompra("Debo"));
                break;
            case 'pagado':
                dispatch(filtraEstadoRemitoCompra("Pago"));
                break;
            case 'fechaMax':
                dispatch();
                break;
            case 'fechaMin':
                dispatch();
                break;
            case 'todos':
                dispatch(getRemitosProveedor(proveedor));
                break;
            default:
                break; 
            
        }
    };


    useEffect(()=>{
        dispatch(getRemitosProveedor(proveedor));
    },[dispatch, proveedor]);


    return (
        <div className='cont-lista-remitos-proveedor'>
            <h1 className='titulo-cont-lista-remitos-proveedor'>Compras realizadas al proveedor {proveedor}</h1>
            <div className="cont-filtros-btnTeset-lista-remitos-proveedor">
                <div className='cont-filtros-lista-remitos-proveedor'>
                    <FiltrosComprasVentasFecha  
                        /* handleOnSubFechas={handleOnSubFechas} 
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta} */
                    />
                    <FiltraDebePago handleOnClick={handleOnClick}/>
                </div>
                <div className='cont-btnReset-lista-remitos-proveedor'>
                    <BotonResetFiltros handleOnClick={handleOnClick}/>
                </div>
            </div>                         
            <TablaCompras compras={compras} />
        </div>
    )
}

export default ListaRemitosProveedor