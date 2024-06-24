import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRemitos } from '../../Redux/Actions';
import './estilos.css';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitos);
    const dispatch = useDispatch();

    //funcion calcula saldo
    const calculateSaldo = (remitos) => {
        let saldo = 0;
        return remitos.map(r => {
            if (r.estado === 'debe') {
                saldo -= r.totPedido;
            } else if (r.estado === 'pagado') {
                saldo = saldo + r.totPedido;
            }
            return {
                ...r,
                saldo,
                saldoText: saldo >= 0 ? 'A favor' : 'Debo'
            };
        });
    };
    //ejecutoi funcion - retorna un nuevo array
    const arrayMovimientos = calculateSaldo(remitos); console.log("nuevoArr:", arrayMovimientos)

    useEffect(()=>{
        dispatch(getAllRemitos());
    }, [dispatch]);


    return (
        <div>
            <table className="client-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Envio</th>
                        <th>Detalle</th>
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
                                <td>{r.fecha}</td>
                                <td></td>
                                <td>{r.items[0].cantidad}kg de {r.items[0].detalle}</td>
                                <td>{r.items[0].unitario}</td>
                                <td>{r.estado === 'debe' ? r.totPedido : '-'}</td>
                                <td>{r.estado === 'pagado' ? r.totPedido : '-'}</td>
                                <td className={r.saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>{r.saldo}</td>
                                <td>{r.saldoText}</td>
                                <td>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListaRemitos;