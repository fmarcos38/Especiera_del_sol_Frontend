import React from 'react'

function ListaCuentaCorrienteCliente({data}) {
    return (
        <div className="cuenta-corriente-container">
        <table className="client-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>N° Remito</th>
                    <th>Detalle</th>
                    <th>Debe</th>
                    <th>Haber</th>
                </tr>
            </thead>
            <tbody>
                {data.map(remito => (
                    <>
                        {/* Fila del remito */}
                        <tr key={remito._id}>
                            <td>{new Date(remito.fecha).toLocaleDateString()}</td>
                            <td>{remito.numRemito}</td>
                            <td>Compra</td>
                            <td>${remito.totPedido.toLocaleString()}</td>
                            <td>-</td>
                        </tr>
                        {/* Filas de entregas */}
                        {remito.entrego.map((entrega, index) => (
                            <tr key={`${remito._id}-entrega-${index}`}>
                                <td>{new Date(entrega.fechaEntrega).toLocaleDateString()}</td>
                                <td>{remito.numRemito}</td>
                                <td>Pago</td>
                                <td>-</td>
                                <td>${entrega.entrega.toLocaleString()}</td>
                            </tr>
                        ))}
                    </>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default ListaCuentaCorrienteCliente