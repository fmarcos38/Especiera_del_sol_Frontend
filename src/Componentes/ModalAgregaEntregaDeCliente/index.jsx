import React, { useContext, useEffect, useState } from 'react';
import { AppContexto } from '../../Contexto';
import { useDispatch, useSelector } from 'react-redux';
import { agregaEntrega, editaEntrega, eliminaEntrega, getRemitoById, modificaRemito } from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './estilos.css';

//componente que crea y a su ves modif
function ModalAgregaEntregaCliente({ id }) {

    const contexto = useContext(AppContexto);
    const [data, setData] = useState({
        monto: "",
        metodoPago: "",
        idEntrega: null // Para almacenar el ID de la entrega a modificar
    });
    const [errors, setErrors] = useState({});
    const [modif, setModif] = useState(false);
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito);

    const handleOnchange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });

        // Quitar mensaje de error si se llena el dato
        if (value) {
            const errores = { ...errors };
            delete errores[id];
            setErrors(errores);
        }
    };
    const handleClickModif = (id) => {
        setModif(true);
        // Buscar la entrega y actualizar el estado
        let entrega = remito.entrego.find(e => e.id === id);
        setData({
            idEntrega: id,  // Guarda el ID de la entrega a modificar
            monto: entrega.entrega,
            metodoPago: entrega.metodoPago
        });
    };
    // Función para validar inputs
    const validate = () => {
        const newErrors = {};

        if (!data.monto) newErrors.monto = 'Monto es requerido';
        if (!data.metodoPago) newErrors.metodoPago = 'Metodo Pago es requerido';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    // Función para calcular el saldo restante
    const calcSaldoRestante = () => {
        let tot = remito.totPedido;
        remito.entrego?.forEach(e => {            
            tot -= e.entrega;
        });
        return tot;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Modifica la entrega existente
            if (modif) {                
                const entregaModificada = {
                    monto: data.monto,
                    metodoPago: data.metodoPago
                };
                dispatch(editaEntrega(remito._id, data.idEntrega, entregaModificada)).then(() => {
                    const saldoRestante = calcSaldoRestante() - data.monto;
                    if (saldoRestante === 0) {
                        dispatch(modificaRemito(id, { estado: "Pagado" }));
                    }
                    dispatch(getRemitoById(id));
                    window.location.reload();
                });
            } else {
                // Crea una nueva entrega
                dispatch(agregaEntrega(id, data)).then(() => {
                    const saldoRestante = calcSaldoRestante() - data.monto;
                    if (saldoRestante === 0) {
                        dispatch(modificaRemito(id, { estado: "Pagado" }));
                    }
                    dispatch(getRemitoById(id));
                    window.location.reload();
                });
                setData({
                    monto: "",
                    metodoPago: "",
                    idEntrega: null 
                });
                
            }
        }
    };
    const handleClickElimina = (idEntrega) => {
        dispatch(eliminaEntrega(remito._id, idEntrega))
        .then(() => {
            dispatch(getRemitoById(id));
            window.location.reload();
        });
        
    }; 

    useEffect(() => {
        dispatch(getRemitoById(id));
    }, [dispatch, id]);

    useEffect(()=>{

    },[remito]);

    return (
        <div className='cont-modal-entregaCliente'>
            <div className="modal-content">
                <button
                    onClick={() => { contexto.setModalEntregaCliente(false) }}
                    className='btn-cerrar-modal-entrega'
                >
                    X
                </button>

                {/* Formulario agrega entrega */}
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

                            {
                                !modif ?
                                <button type='submit' id='crea' className='btn-carga-entrega'>Cargar Entrega</button>
                                :
                                <button type='submit' id='modif' className='btn-carga-entrega'>Modificar Entrega</button>
                            }
                        </form>
                    )
                }

                {/* Tabla muestra entregas */}
                <div className="table-container">
                    {
                        remito.estado === 'Pagado' ? (
                            <></>
                        ) : (
                            <>
                                <table className="client-table entregaMonto">
                                    <thead>
                                        <tr>
                                            <th>Fecha Entrega</th>
                                            <th>Monto</th>
                                            <th>Metodo Pago</th>
                                            <th style={{ width: '100px' }}>Edita/Elimina</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ color: "#fff", fontSize: "23px" }}>
                                        {
                                            remito.entrego?.map(e => {
                                                return (
                                                    <tr key={e.fechaEntrega}>
                                                        <td>{fechaArg(e.fechaEntrega)}</td>
                                                        <td>${formatMoney(e.entrega)}</td>
                                                        <td>{e.metodoPago}</td>
                                                        <td>
                                                            <div className='cont-btne-entrega'>
                                                                <button
                                                                    className='btns-edit-elim-entrega'
                                                                    onClick={() => { handleClickModif(e.id) }}
                                                                >
                                                                    <EditIcon sx={{ 'font-size': '18px' }} />
                                                                </button>
                                                                <button
                                                                    className='btns-edit-elim-entrega'
                                                                    onClick={() => { handleClickElimina(e.id) }}
                                                                >
                                                                    <DeleteForeverIcon sx={{ 'font-size': '18px' }} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style={{ color: 'white', fontSize: '23px' }}>Restan</td>
                                            <td style={{ color: 'white', fontSize: '23px' }}>${formatMoney(calcSaldoRestante())}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalAgregaEntregaCliente;