import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras, resetRemitos } from '../../Redux/Actions';
import './estilos.css';
import TablaCompras from '../TablaCompras';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitosCompras);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCompras());

        //return () => {dispatch(resetRemitos())};
    }, [dispatch]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            <TablaCompras compras={remitos}/>
        </div>
    )
}

export default ListaRemitos;