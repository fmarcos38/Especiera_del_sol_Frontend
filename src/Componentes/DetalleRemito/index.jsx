import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Remito from '../Remito';
import { getRemitoById } from '../../Redux/Actions';


function DetalleRemito() {
    const {_id} = useParams(); console.log("_id;", _id)
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); console.log("numR;", remito.numRemito)
    const cliente = useSelector(state => state.cliente);

    useEffect(() => {
        dispatch(getRemitoById(_id));
        
    }, [_id, dispatch]);


    return (
        <div>
            <p>{remito.numRemito}</p>
            {/* <Remito operacion={"muestra"} numUltimoRemito={remito.numRemito} cliente={cliente} items={remito.items} totPedido={remito.totPedido} /> */}
        </div>
    )
}

export default DetalleRemito