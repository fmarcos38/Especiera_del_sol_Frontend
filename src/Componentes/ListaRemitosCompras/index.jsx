import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras } from '../../Redux/Actions';
import TablaCompras from '../TablaCompras';
import './estilos.css';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitosCompras);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCompras());
    }, [dispatch]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            <TablaCompras compras={remitos}/>
        </div>
    )
}

export default ListaRemitos;