import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { buscaProveedorPorCuit, getRemitoCompra, } from '../../Redux/Actions';
import RemitoMuestraCompra from '../RemitoMuestraCompra';


function DetalleRemitoCompra() {
    const {_id} = useParams(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); 
    const proveedor = useSelector(state => state.proveedor); 

    useEffect(() => {
        dispatch(getRemitoCompra(_id));
        dispatch(buscaProveedorPorCuit(remito.cuit));
    }, [_id, dispatch, remito.cuit]);


    return (
        <div>            
            <RemitoMuestraCompra 
                proveedor={proveedor}
                remito={remito}
            />
        </div>
    )
}

export default DetalleRemitoCompra