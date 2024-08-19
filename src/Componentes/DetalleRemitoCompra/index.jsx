import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { buscaProveedorPorCuit, getRemitoCompra, resetProv, resetRemito, } from '../../Redux/Actions';
import RemitoMuestraCompra from '../RemitoMuestraCompra';
import './estilos.css';

function DetalleRemitoCompra() {
    const {_id} = useParams(); 
    //no hace falta ESTADOS locales, ya que me traigo directmnt del estado global la data necesaria
    const remito = useSelector(state => state.remito); 
    const proveedor = useSelector(state => state.proveedor);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (remito.cuit) {
            dispatch(buscaProveedorPorCuit(remito.cuit));
        }

        return ()=>{dispatch(resetProv())}
    },[dispatch, remito.cuit]);
    useEffect(() => {
        dispatch(getRemitoCompra(_id));

        return ()=>{dispatch(resetRemito())}
    }, [_id, dispatch]);


    return (
        <div className='cont-detalle-remito-compra'>            
            <RemitoMuestraCompra 
                proveedor={proveedor}
                remito={remito}
            />
        </div>
    )
}

export default DetalleRemitoCompra