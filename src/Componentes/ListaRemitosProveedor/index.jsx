import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosProveedor } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import TablaCompras from '../TablaCompras';


function ListaRemitosProveedor() {
    const compras = useSelector(state => state.remitosProveedor); //console.log("compras:", compras);
    const {nombre, apellido} = useParams();
    const proveedor = nombre+" "+apellido;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRemitosProveedor(proveedor));
    },[dispatch, proveedor]);


    return (
        <div>
            <h1>Compras realizadas al proveedor {proveedor}</h1> 
            <TablaCompras compras={compras.compras} />
        </div>
    )
}

export default ListaRemitosProveedor