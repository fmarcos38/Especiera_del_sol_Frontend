import React, { useContext, useEffect, useState } from 'react';
import { AppContexto } from '../../Contexto';
import { useDispatch, useSelector } from 'react-redux';
import { agregaEntrega, getRemitoById, modificaRemito } from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import './estilos.css';


function ModalAgregaEntregaCliente({id}) {

    const contexto = useContext(AppContexto);
    const [data, setData] = useState({
        monto: "",
        metodoPago: ""
    });
    const [errors, setErrors] = useState({}); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito);
    
    const handleOnchange = (e) => {
        const {id, value} = e.target
        setData({...data, [id]: value});

        //quito msj de error si se llena el dato
        if(value){
            const errores = {...errors};
            delete errores[id];
            setErrors(errores);
        }
    };
    //funcion valida inputs
    const validate = () => {
        const newErrors = {};

        if (!data.monto) newErrors.monto = 'Monto es requerido';
        if (!data.metodoPago) newErrors.metodoPago = 'Metodo Pago es requerido';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    //funcion calc saldo restante
    const calcSaldoRestante = () => {
        let tot = 0;
        if(remito.estado === 'Pagado'){
            return tot;
        }else{
            if(remito.entrego?.length === 0){
                tot = remito.totPedido
            }
            tot = remito.totPedido;
            remito.entrego?.map(e => {            
                return tot -= e.entrega;
            });
            return tot;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(agregaEntrega(id, data)).then(() => {
                const saldoRestante = calcSaldoRestante() - data.monto;
                if (saldoRestante === 0) {
                    dispatch(modificaRemito(id, { estado: "Pagado" }));
                }
                window.location.reload();
            });
        }
    };

    useEffect(()=>{
        dispatch(getRemitoById(id));
    },[dispatch, id]);


    return (
        <div className='cont-modal-entregaCliente'>
            <div className="modal-content">
                <button
                    onClick={() => { contexto.setModalEntregaCliente(false) }}
                    className='btn-cerrar-modal-entrega'
                >
                    X
                </button>

                {/* formulario agrega entrega */}
                {
                    remito.estado === 'Pagado' ? (
                        <h1 className='remito-saldado'>REMITO SALDADO !!</h1>
                    ) : (
                        <form onSubmit={(e) => { handleSubmit(e) }} className='formulario-monto'>
                            <div className='cont-item-data-agregaPago'>
                                <label className='label-monto'>Monto</label>
                                <input
                                    type='number'
                                    id='monto'
                                    value={data.monto}
                                    onChange={(e) => handleOnchange(e)}
                                    className='input-monto'
                                />
                                {errors.monto && (<span className='errors'>{errors.monto}</span>)}
                            </div>
                            <div className='cont-item-data-agregaPago'>
                                <label className='label-monto'>Metodo pago</label>
                                <input
                                    type='text'
                                    id='metodoPago'
                                    value={data.metodoPago}
                                    onChange={(e) => handleOnchange(e)}
                                    className='input-monto'
                                />
                                {errors.metodoPago && (<span className='errors'>{errors.metodoPago}</span>)}
                            </div>

                            <button type='onSubmit' className='btn-carga-entrega'>Cargar Entrega</button>
                        </form>
                    )
                }

                {/* tabla muestra entregas */}
                <div className="table-container">
                    <table className="client-table entregaMonto">
                        <thead>
                            <tr>
                                <th>Fecha Entrega</th>
                                <th>Monto</th>
                                <th>Metodo Pago</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "#fff", fontSize: "23px" }}>
                            {
                                remito.entrego?.map(e => {
                                    return (
                                        <tr key={e.fechaEntrega}>
                                            <td>{fechaArg(e.fechaEntrega)}</td>
                                            <td>${formatMoney(e.entrega)}</td>
                                            <td>${e.metodoPago}</td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{ color: 'white', fontSize: '23px' }}>Restan</td>
                                <td style={{ color: 'white', fontSize: '23px' }}>${formatMoney(calcSaldoRestante())}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregaEntregaCliente