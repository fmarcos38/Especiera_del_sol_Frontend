import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras } from '../../Redux/Actions';
import './estilos.css';
import { fechaArg } from '../../Helpers';


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
    //ejecutoi funcion - retorna un nuevo array
    const arrayMovimientos = calculateSaldo(remitos); //console.log("nuevoArr:", arrayMovimientos)

    useEffect(()=>{
        dispatch(getAllCompras());
    }, [dispatch]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <table className="client-table listaCompras">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Envio</th>
                        <th>n° Remito</th>                        
                        <th>Detalle</th>
                        <th>Proveedor</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Unitario</th>                        
                        <th>Debo</th>
                        <th>Haber</th>
                        <th>Saldo</th>
                        <th>Observaciones</th>
                        <th>Detalle Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayMovimientos?.map((r,i) => (
                            <tr key={r._id}>
                                <td>{fechaArg(r.fecha)}</td>
                                <td>{r.envio}</td>
                                <td>{r.numRemito}</td>
                                <td>{r.detalle}</td>
                                <td>{r.proveedor}</td>
                                <td>{r.producto}</td>
                                <td>{r.cantidad}</td>
                                <td>{r.unitario}</td>
                                <td>{r.estado === 'Debo' ? r.total : ' '}</td>
                                <td>{r.estado === 'Pago' ? r.total : ' '}</td>
                                <td className={r.saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>{r.saldo}</td>
                                <td>{r.saldoText}</td>
                                <td>{r.detallePago}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListaRemitos;