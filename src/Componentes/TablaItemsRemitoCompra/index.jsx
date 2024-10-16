import React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { formatMoney } from '../../Helpers';


function TablaItemsRemitoCompra({pedido, handleElimnimaItem, calculaTotPedido}) {
    return (
        <table className="client-table">
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Detalle</th>
                    <th>P.Unitario</th>
                    <th>Importe</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>Elimina</th>
                </tr>
            </thead>
            <tbody>
                {
                    pedido?.map(item => {
                        return (
                            <tr key={item.detalle}>
                                <td>{item.cantidad}</td>
                                <td>{item.detalle}</td>
                                <td>${formatMoney(item.unitario)}</td>
                                <td>${formatMoney(item.importe)}</td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={() => { handleElimnimaItem(item.detalle) }} className='btn-elimina-item-pedido'>
                                        <DeleteIcon className='icono-elimina-item' />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
            <tfoot>
                <td>TOTAL</td>
                <td></td>
                <td></td>
                <td>${formatMoney(calculaTotPedido())}</td>
            </tfoot>
        </table>
    )
}

export default TablaItemsRemitoCompra