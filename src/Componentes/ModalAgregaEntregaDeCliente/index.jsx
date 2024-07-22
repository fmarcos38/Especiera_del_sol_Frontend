import React, { useContext, useEffect, useState } from 'react';
import { AppContexto } from '../../Contexto';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { agregaEntrega, getRemitoById } from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import Swal from 'sweetalert2';

function ModalAgregaEntregaCliente({id}) {

    const contexto = useContext(AppContexto);
    const [monto, setMonto] = useState(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito);

    //funcion calc saldo restante
    const calcSaldoRestante = () => {
        let tot = remito?.totPedido;
        remito.entrego?.map(e => {            
            return tot -= e.entrega;
        });
        return tot;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!monto){
            Swal.fire({
                text: "Ingrese un Monto",
                icon: "error"
            })
        }else{
            dispatch(agregaEntrega(id, {monto: monto}));
            window.location.reload();
        }
    };

    useEffect(()=>{
        dispatch(getRemitoById(id));
    },[dispatch, id]);

    return (
        <div className='cont-modal-entregaCliente'>
            <div className='cont-btn-cierra-modal'>
                <button
                    onClick={() => { contexto.setModalEntregaCliente(false) }}
                    className='btn-cerrar-modal-cliente'
                >
                    X
                </button>
            </div>
            
            {/* formulario agrega entrega */}
            <form onSubmit={(e) => { handleSubmit(e) }} className='formulario-monto'>
                <label className='label-monto'>Monto</label>
                <input type='number' value={monto} onChange={(e) => setMonto(e.target.value)} className='input-monto' />
                <button type='onSubmit' className='btn-carga-entrega'>Cargar Entrega</button>
            </form>           

            {/* tabla muestra entregas */}
            <div className='cont-tabla-entregas-remito'>
                <table className="client-table entregaMonto">
                    <thead>
                        <tr>
                            <th>Fecha Entrega</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: "#fff", fontSize:"23px" }}>
                        {
                            remito.entrego?.map(e => {
                                return (
                                    <tr key={e.fechaEntrega}>
                                        <td>{fechaArg(e.fechaEntrega)}</td>
                                        <td>${formatMoney(e.entrega)}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Restan</td>
                            <td>${ formatMoney(calcSaldoRestante()) }</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ModalAgregaEntregaCliente