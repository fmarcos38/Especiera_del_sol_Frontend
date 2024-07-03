import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras } from '../../Redux/Actions';
import './estilos.css';
import TablaCompras from '../TablaCompras';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitos);
    const dispatch = useDispatch();

    //funcion calcula saldo
    const calculateSaldo = (remitos) => {
        let saldo = 0;
        return remitos.map(r => {
            if (r.estado === 'Debo') {
                saldo -= r.total;
            } else if (r.estado === 'Pago') {
                saldo = saldo + r.total;
            }
            return {
                ...r,
                saldo,
                saldoText: saldo >= 0 ? 'A favor' : 'Debo'
            };
        });
    };
    //ejecuto funcion - retorna un nuevo array
    const arrayMovimientos = calculateSaldo(remitos); //console.log("nuevoArr:", arrayMovimientos)

    useEffect(()=>{
        dispatch(getAllCompras());
    }, [dispatch]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            <TablaCompras compras={arrayMovimientos}/>
        </div>
    )
}

export default ListaRemitos;