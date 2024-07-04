import React from 'react'
import { fechaArg } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './estilos.css';

function TablaCompras({ compras }) {

    //funcion calcula saldo
    const calculateSaldo = (remitos) => {
        let saldo = 0;
        return remitos?.map(r => {
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
    const arrayMovimientos = calculateSaldo(compras); //console.log("nuevoArr:", arrayMovimientos)

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
                    <th>Elim/Edita</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayMovimientos?.map(r => (
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
                            <td style={{width: '50px'}}>
                                <div style={{display: 'flex'}} key={r._id}>
                                    <Link to={`/editaRemitoCompra/${r._id}`}>
                                        <button>
                                            <EditIcon/>
                                        </button>
                                    </Link>
                                    <button>
                                        <DeleteForeverIcon/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TablaCompras