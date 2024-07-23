import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Remito from '../Remito';
import { buscaClientePorCuit, getRemitoById, } from '../../Redux/Actions';


function DetalleRemito() {
    const {_id} = useParams(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); 
    const cliente = useSelector(state => state.cliente);

    useEffect(() => {
        dispatch(getRemitoById(_id));
        dispatch(buscaClientePorCuit(remito.cuit));
    }, [_id, dispatch, remito.cuit]);


    return (
        <div>            
            <Remito 
                operacion={"muestra"} 
                numUltimoRemito={remito.numRemito} 
                cliente={cliente} 
                items={remito.items} 
                totPedido={remito.totPedido}
                bultos={remito.bultos} 
                transporte={remito.transporte}
            />
        </div>
    )
}

export default DetalleRemito