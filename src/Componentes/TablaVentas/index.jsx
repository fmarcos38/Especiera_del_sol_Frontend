import React from 'react'
import { fechaArg, formatMoney } from '../../Helpers';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';


function TablaVentas({ ventas }) { 

    //funcion calc el tot de las entregas
    const calcEntregas = (entregas, estado, totPedido) => {
        let tot=0;

        if(estado === "Pagado"){
            return totPedido;
        }else{
            if(entregas.length !== 0){
                entregas.map(e => {
                    return tot += e.entrega; 
                });
            }
        }

        return tot;
    };
    //funcion calcula las entregas y resta del saldo
    const calculaSaldo = (tot, entregas, estado) =>{
        let saldo = 0;

        if(estado === "Pagado"){
            return saldo;
        }else{
            if (entregas.length !== 0) {
                const totEntregas = calcEntregas(entregas);
                saldo = tot - totEntregas;
                return saldo;
            }else{
                return tot;
            }
        }
    };
    //calcula el total de todos los remitos
    const totRemitos = () => {
        let tot = 0;
        ventas.map(r => {
            tot = tot + r.totPedido;
            return tot;
        });
        return tot;
    };
    //funcion calc el tot de los saldos 
    const totSaldos = () => {
        let tot = 0; 
        ventas.map(r => {
            return tot += calculaSaldo(r.totPedido, r.entrego, r.estado); 
        });
        return tot;
    };
    //funcion calc el tot de entregas
    const totEntregas = () => {
        let tot = 0;
        ventas.map(r => {
            r.entrego.map(e => {
                return tot += e.entrega;
            });
            return 0;
        });
        return tot;
    };


    return (
        <table className="client-table listaCompras">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Remito</th>
                    <th>Cliente</th>                    
                    <th>Tot.venta</th>                    
                    <th>Entregó</th>
                    <th>Saldo</th>
                    <th>Estado</th>
                    <th>Ganancia</th>
                    <th>Detalle</th>
                    <th>Elim/Edita</th>
                </tr>
            </thead>
            <tbody>
                {
                    ventas?.map(r => (
                        <tr key={r._id}>
                            <td>{fechaArg(r.fecha)}</td>
                            <td>{r.numRemito}</td>
                            <td>{r.cliente}</td>
                            <td>{formatMoney(r.totPedido)}</td>
                            <td>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                {
                                    formatMoney(calcEntregas(r.entrego, r.estado, r.totPedido))
                                }
                                <button>ver</button>
                                </div>
                            </td>
                            <td className={calculaSaldo(r.totPedido, r.entrego, r.estado) > 0  ? 'debe' : 'pagado'}>{formatMoney(calculaSaldo(r.totPedido, r.entrego, r.estado))}</td>
                            <td className={r.estado === 'Debe' ? 'debe' : 'pagado'}>{r.estado}</td>
                            <td>{r.ganancia}</td>
                            <td>
                                <button>Detalle</button>
                            </td>
                            <td style={{width: '50px'}}>
                                <div style={{display: 'flex'}} key={r._id}>
                                    <Link to={`/editaRemitoVenta/${r._id}`}>
                                        <button>
                                            <EditIcon/>
                                        </button>
                                    </Link>
                                    <button>Elimina</button>{/* <BotonEliminaRemitoVenta _id={r._id}/> */}
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
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totRemitos())}</td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totEntregas())}</td>
                                <td style={{color: 'white', fontSize:'23px', fontWeight:'600'}}>{formatMoney(totSaldos())}</td>
                                <td></td>                                                                
                                <td></td>
                                <td></td>
                                <td></td>
                            </tfoot>
        </table>
    )
}

export default TablaVentas;