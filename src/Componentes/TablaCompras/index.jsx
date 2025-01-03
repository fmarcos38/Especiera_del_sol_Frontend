import React from 'react'
import { fechaArg, formatMoney } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BotonEliminaRemitoCompra from '../BotonEliminaRemitoCompra';
import './estilos.css';


function TablaCompras({ compras }) {

    //funcion calcula saldo
    const calculaSaldo = (remitos) => {
        let saldo = 0;
        return remitos?.map(r => {
            if (r.detalle === 'Compra') {
                saldo -= r.total;
            } else if (r.detalle === 'Pago') {
                saldo += r.total;
            }
            return {
                ...r,
                saldo,
                saldoText: saldo >= 0 ? 'A favor' : 'Debo'
            };
        });
    };
    //funcion calcula saldos para el foot de la tabla
    const calculaSaldos = (tipo) => {
        let tot = 0;
        compras.map(operacion => {
            if(operacion.detalle === tipo){
                tot += operacion.total;
            }
            return tot;
        });
        return tot;
    };
    //ejecuto funcion - retorna un nuevo array
    const arrayMovimientos = calculaSaldo(compras); //console.log("nuevoArr:", arrayMovimientos)

    return (
        <table className="client-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    {/* <th>Envio</th> */}
                    <th>n° Comp</th>
                    <th>n° Remito</th>
                    <th>Detalle</th>
                    <th>Proveedor</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                    <th>Observ</th>
                    <th>Pago</th>
                    <th>Edit/Elim</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayMovimientos?.map(r => (
                        <tr key={r._id}>
                            <td>{fechaArg(r.fecha)}</td>
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
                            <td>{r.detalle === 'Compra' ? r.total : ' '}</td>
                            <td>{r.detalle === 'Pago' ? r.total : ' '}</td>
                            <td className={r.saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>{r.saldo}</td>
                            <td>{r.saldoText}</td>
                            <td>{r.detallePago}</td>
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
            <tfoot>
                <tr>
                    <td>Totales</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${formatMoney(calculaSaldos("Compra"))}</td>
                    <td>${formatMoney(calculaSaldos("Pago"))}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default TablaCompras