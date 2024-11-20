import React, { useEffect } from 'react';
import { fechaArg, formatMoney } from '../../Helpers';
import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BotonEliminaRemitoVenta from '../BotonEliminaRemitoVenta';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { buscaClientePorCuit } from '../../Redux/Actions';

function TablaVentas({ ventas, cuit }) {

    const dispatch = useDispatch();
    const cliente = useSelector(state => state.cliente);
    // Función para calcular el saldo
    const calculaSaldo = (remitos) => {
        let saldo = 0; // Saldo inicial
        return remitos?.map((r) => {
            let debe = 0;
            let haber = 0;

            if (r.tipoRemito === 'Venta') {
                debe = r.totPedido; // Asignar valor al "Debe"
                saldo -= debe; // Resta al saldo acumulativo
            } else if (r.tipoRemito === 'Pago') {
                haber = r.totPedido; // Asignar valor al "Haber"
                saldo += haber; // Suma al saldo acumulativo
            }

            return {
                ...r,
                debe,
                haber,
                saldo,
                saldoText: saldo >= 0 ? 'A favor' : 'Debo', // Texto adicional para el saldo
            };
        });
    };

    // Ejecutar la función de cálculo
    const arrayMovimientos = calculaSaldo(ventas);

    // Calcular totales para el footer
    const totalDebe = arrayMovimientos?.reduce((acc, r) => acc + (r.debe || 0), 0);
    const totalHaber = arrayMovimientos?.reduce((acc, r) => acc + (r.haber || 0), 0);
    const totalSaldo = arrayMovimientos?.length > 0 ? arrayMovimientos[arrayMovimientos.length - 1].saldo : 0;

    useEffect(()=>{
        dispatch(buscaClientePorCuit(cuit));
    },[cuit, dispatch]);

    return (
        <div className='cont-tabla-remitosCliente'>
            <h2>Cliente: {cliente.nombreApellido}</h2>
            <table className="client-table ">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>N° Remito</th>
                        <th>Detalle</th>
                        <th>Debe</th>
                        <th>Haber</th>
                        <th>Saldo</th>
                        <th>Detalle Saldo</th>
                        <th>Cond. de Pago</th>
                        <th>Ver</th>
                        <th>Edita/Elim</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayMovimientos?.map((r) => (
                        <tr key={r._id}>
                            <td className='colTablaVentas'>{fechaArg(r.fecha)}</td>
                            <td >{r.numRemito}</td>
                            <td >{r.tipoRemito}</td>
                            <td >{r.debe > 0 ? formatMoney(r.debe) : '-'}</td>
                            <td >{r.haber > 0 ? formatMoney(r.haber) : '-'}</td>
                            <td className={r.saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>
                                {formatMoney(r.saldo)}
                            </td>
                            <td >{r.saldoText}</td>
                            <td >{r.condicion_pago}</td>
                            <td>
                                <NavLink to={`/detalleRemitoVenta/${r._id}`}>
                                    <button>Ver</button>
                                </NavLink>
                            </td>
                            <td style={{ width: '50px' }}>
                                    <div style={{ display: 'flex' }} key={r._id}>
                                        {/* btn edita */}
                                        {
                                            r.tipoRemito === 'Venta' ? (
                                                <NavLink to={`/editaRemito/${r._id}`}>
                                                    <button>
                                                        <EditIcon />
                                                    </button>
                                                </NavLink>
                                            ) : (
                                                <NavLink to={`/editaPagoRemito/${r._id}`}>
                                                    <button>
                                                        <EditIcon />
                                                    </button>
                                                </NavLink>
                                            )
                                            
                                        }
                                        {/* btn elim */}
                                        <BotonEliminaRemitoVenta _id={r._id} />
                                    </div>
                                </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Totales</td>
                        <td>${formatMoney(totalDebe)}</td>
                        <td>${formatMoney(totalHaber)}</td>
                        <td className={totalSaldo}>
                            ${formatMoney(totalSaldo)}
                        </td>
                        <td colSpan="4"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TablaVentas;
