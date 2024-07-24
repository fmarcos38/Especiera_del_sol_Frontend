import React, { useState, useContext } from 'react';
import { AppContexto } from '../../Contexto';
import { fechaArg, formatMoney } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ModalAgregaEntregaCliente from '../ModalAgregaEntregaDeCliente';
import BotonEliminaRemitoVenta from '../BotonEliminaRemitoVenta';
import './estilos.css';


function TablaVentas({ ventas, calcGanancia, calcEntregas, calculaSaldo, totRemitos, totEntregas, totSaldos, calcTotGanancias}) { 

    //estado para obtener el id del remito y pasarselo al modal
    const [id, setId] = useState(); 
    const contexto = useContext(AppContexto);

    //abre modal
    const handleClickModal = (id) => {
        contexto.setModalEntregaCliente(true);
        setId(id);
    };

    
    return (
        <div style={{width: "100%"}}>
            <table className="client-table listaCompras">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Remito</th>
                        <th>Cliente</th>
                        <th>Tot.venta</th>
                        <th>Pagos</th>
                        <th>Saldo</th>
                        <th>Ganancia</th>
                        <th>Estado</th>
                        <th>Detalle</th>
                        <th>Edita/Elim</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas?.map(r => (
                            <tr key={r._id}>
                                <td>{fechaArg(r.fecha)}</td>
                                <td>{r.numRemito}</td>
                                <td>{r.cliente}</td>
                                <td>${formatMoney(r.totPedido)}</td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        ${formatMoney(calcEntregas(r.entrego, r.estado, r.totPedido))}
                                        <button onClick={() => { handleClickModal(r._id) }}>ver</button>
                                    </div>
                                </td>
                                <td
                                    className={calculaSaldo(r.totPedido, r.entrego, r.estado) > 0 ? 'debe' : 'pagado'}
                                >
                                    ${formatMoney(calculaSaldo(r.totPedido, r.entrego, r.estado))}
                                </td>
                                <td>${formatMoney(calcGanancia(r.items))}</td>
                                <td className={r.estado === 'Debe' ? 'debe' : 'pagado'}>{r.estado}</td>
                                <td>
                                    <Link to={`/detalleRemito/${r._id}`}>
                                        <button>Detalle</button>
                                    </Link>
                                </td>
                                <td style={{ width: '50px' }}>
                                    <div style={{ display: 'flex' }} key={r._id}>
                                        <Link to={`/editaRemito/${r._id}`}>
                                            <button>
                                                <EditIcon />
                                            </button>
                                        </Link>
                                        <BotonEliminaRemitoVenta _id={r._id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <td>TOTALES</td>
                    <td></td>
                    <td></td>
                    <td style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totRemitos())}</td>
                    <td style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totEntregas())}</td>
                    <td style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totSaldos())}</td>
                    <td style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(calcTotGanancias())}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tfoot>
            </table>

        {/* modal entrega cliente */}
        {
            contexto.modalEntregaCliente === true && (
                <div className='cont-modal-entrega'>
                    <ModalAgregaEntregaCliente id={id}/>
                </div>
            )
        }
        </div>
    )
}

export default TablaVentas;