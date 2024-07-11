import React, { useContext, useEffect, useState } from 'react';
import { AppContexto } from '../../Contexto';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRemitoById } from '../../Redux/Actions';
import { fechaArg } from '../../Helpers';

function ModalAgregaEntregaCliente({id}) {

    const contexto = useContext(AppContexto);
    const [monto, setMonto] = useState();
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito);

    const handleSubmit = () => {}


    useEffect(()=>{
        console.log("disparé:", id)
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
            <div className='cont-form-monto'>
                <form onSubmit={()=> {handleSubmit()}} className='formulario-monto'>
                    <label className='label-monto'>Monto</label>
                    <input type='number' value={monto} onChange={(e) => setMonto(e.target.value)} className='input-monto' />
                    <button type='onSubmit' className='btn-carga-entrega'>Cargar Entrega</button>
                </form>
            </div>

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
                                        <td>${e.entrega}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModalAgregaEntregaCliente