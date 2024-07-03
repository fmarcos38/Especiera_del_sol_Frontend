import React from 'react'
import { fechaArg } from '../../Helpers';
import './estilos.css';


function TablaCompras({ compras }) {
    return (
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
                    compras?.map(r => (
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
    )
}

export default TablaCompras