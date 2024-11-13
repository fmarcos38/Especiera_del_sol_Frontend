import React, { useState, useContext } from 'react';
import { AppContexto } from '../../Contexto';
import { fechaArg, formatMoney } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BotonEliminaRemitoVenta from '../BotonEliminaRemitoVenta';
import ModalAgregaEntregaCliente from '../ModalAgregaEntregaDeCliente';
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
                        {/* <th>Ganancia</th> */}
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
                                        <button 
                                            onClick={() => { handleClickModal(r._id) }}
                                            style={{fontSize:'12px'}}
                                        >
                                            Ingresar
                                        </button>
                                    </div>
                                </td>
                                <td
                                    className={calculaSaldo(r.totPedido, r.entrego, r.estado) > 0 ? 'debe' : 'pagado'}
                                >
                                    ${formatMoney(calculaSaldo(r.totPedido, r.entrego, r.estado))}
                                </td>
                                {/* <td>${formatMoney(calcGanancia(r.items))}</td> */}
                                <td className={r.estado === 'Debe' ? 'debe' : 'pagado'}>{r.estado}</td>
                                <td>
                                    <Link to={`/detalleRemitoVenta/${r._id}`}>
                                        <button>Detalle</button>
                                    </Link>
                                </td>
                                <td style={{ width: '50px' }}>
                                    <div style={{ display: 'flex' }} key={r._id}>
                                        {/* btn edita */}
                                        <Link to={`/editaRemito/${r._id}`}>
                                            <button>
                                                <EditIcon />
                                            </button>
                                        </Link>
                                        {/* btn elim */}
                                        <BotonEliminaRemitoVenta _id={r._id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                    <th>TOTALES</th>
                    <th></th>
                    <th></th>
                    <th style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totRemitos())}</th>
                    <th style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totEntregas())}</th>
                    <th style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(totSaldos())}</th>
                    {/* <th style={{ color: 'white', fontSize: '23px', fontWeight: '600' }}>${formatMoney(calcTotGanancias())}</th> */}
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </tfoot>
            </table>

        {/* modal entrega cliente */}
            {
                contexto.modalEntregaCliente === true && (
                    <div className='cont-modal-entregaCliente'>
                        <ModalAgregaEntregaCliente id={id} />
                    </div>
                )
            }
        </div>
    )
}

export default TablaVentas;