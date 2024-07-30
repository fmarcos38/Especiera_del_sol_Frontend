import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { buscaProveedorPorCuit, getRemitoCompra, } from '../../Redux/Actions';
import RemitoMuestraCompra from '../RemitoMuestraCompra';


function DetalleRemitoCompra() {
    const {_id} = useParams(); 
    const remito = useSelector(state => state.remito); 
    const proveedor = useSelector(state => state.proveedor);        
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRemitoCompra(_id));
        if(remito){
            setR(remito);
        }
    }, [_id, dispatch, remito]);

    useEffect(()=>{
        dispatch(buscaProveedorPorCuit(remito.cuit));
        if(proveedor){
            setP(proveedor);
        }
    },[dispatch, remito.cuit, proveedor]);

    const [r, setR] = useState();
    const [p, setP] = useState(); 
    return (
        <div>            
            <RemitoMuestraCompra 
                proveedor={p}
                remito={r}
            />
        </div>
    )
}

export default DetalleRemitoCompra