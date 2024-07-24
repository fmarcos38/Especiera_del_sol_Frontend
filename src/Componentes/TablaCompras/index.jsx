import React from 'react'
import { fechaArg } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BotonEliminaRemitoCompra from '../BotonEliminaRemitoCompra';
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
        <table className="client-table tabla-listaCompras">
            <thead>
                <tr>
                    <th>Fecha</th>
                    {/* <th>Envio</th> */}
                    <th>n° Comp</th>
                    <th>n° Remito</th>
                    <th>Detalle</th>
                    <th>Proveedor</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Unitario</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                    <th>Observ</th>
                    <th>Pago</th>
                    <th>Transp</th>
                    <th>Edit/Elim</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayMovimientos?.map(r => (
                        <tr key={r._id}>
                            <td>{fechaArg(r.fecha)}</td>
                            {/* <td>{r.envio}</td> */}
                            <td>{r.numCompra}</td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {r.numRemitoProveedor}
                                    {
                                        r.detalle === 'Compra' &&
                                        <Link to={`/detalleRemitoCompra/${r._id}`}>
                                            <button>Ver</button>
                                        </Link>
                                    }
                                </div>
                            </td>
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
                            <td>{r.transporte}</td>
                            <td style={{width: '50px'}}>
                                <div style={{display: 'flex'}} key={r._id}>
                                    <Link to={`/editaRemitoCompra/${r._id}`}>
                                        <button >
                                            <EditIcon sx={{ fontSize: '20px'}}/>
                                        </button>
                                    </Link>
                                    <BotonEliminaRemitoCompra _id={r._id}/>
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