import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creaRemito, getAllClientes, getRemitoById, modificaRemito } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function FormularioPagoCliente({ tipoR }) {
    const clientes = useSelector((state) => state.clientes);
    const remitoPago = useSelector((state) => state.remito);
    const dispatch = useDispatch();

    const {_id} = useParams(); // ID del remito (si estás en modificar)

    const [items, setItems] = useState({
        fecha: '',
        cliente: '',
        cuit: 0,
        tipoRemito: 'Pago',
        totPedido: 0,
        condicion_pago: '',
    });

    // Función para formatear la fecha a 'YYYY-MM-DD'
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleOnChange = (e) => {
        setItems({ ...items, [e.target.id]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!items.totPedido) {
            Swal.fire({
                text: 'Faltan datos!!',
                icon: 'error',
            });
        } else {
            const dataBack = {
                fecha: items.fecha,
                totPedido: items.totPedido,
                cuit: items.cuit,
                cliente: items.cliente,
                tipoRemito: items.tipoRemito,
                condicion_pago: items.condicion_pago
            };

            if (tipoR === 'Pago') {
                dispatch(modificaRemito(_id,dataBack));
            } else {
                dispatch(creaRemito(dataBack));
            }

            Swal.fire({
                text: tipoR === 'Pago' ? 'Modificado con éxito!!' : 'Creado con éxito!!',
                icon: 'success',
            });

            if (tipoR === 'Venta') {
                setItems({
                    fecha: obtenerFechaActual(),
                    cliente: '',
                    cuit: 0,
                    tipoRemito: 'Pago',
                    totPedido: 0,
                    detallePago: '',
                });
            }
            
        }
    };

    // Actualiza la fecha inicial del formulario al montar el componente
    useEffect(() => {
        setItems((prevState) => ({
            ...prevState,
            fecha: obtenerFechaActual(),
        }));
    }, []);

    // Trae todos los clientes
    useEffect(() => {
        dispatch(getAllClientes());
    }, [dispatch]);

    // Si cambia el cliente, actualiza el CUIT
    useEffect(() => {
        if (items.cliente) {
            const dataCliente = clientes.find((c) => c.nombreApellido === items.cliente);
            if (dataCliente) {
                setItems({ ...items, cuit: dataCliente.cuit });
            }
        }
    }, [items.cliente, clientes, items]);

    // Si estás en modo modificar, carga los datos del remito seleccionado en el estado local
    useEffect(() => {
        if (tipoR === 'Pago') {
            dispatch(getRemitoById(_id));
        }
    }, [_id, dispatch, tipoR]);

    useEffect(() => {
        if (tipoR === 'Pago' && remitoPago._id) {
            setItems({
                fecha: remitoPago.fecha || '',
                cliente: remitoPago.cliente || '',
                cuit: remitoPago.cuit || 0,
                tipoRemito: remitoPago.tipoRemito || 'Pago',
                totPedido: remitoPago.totPedido || 0,
                condicion_pago: remitoPago.condicion_pago || '',
            });
        }
    }, [remitoPago, tipoR]);

    return (
        <form onSubmit={handleOnSubmit} className="cont-formulario-anticipo">
            <div className="cont-data-pago">
                {/* Fecha */}
                <div className="cont-item">
                    <label className="label-fecha-compra">Fecha: </label>
                    <input
                        type="date"
                        id="fecha"
                        value={items.fecha}
                        onChange={handleOnChange}
                        className="input-fecha-pago"
                    />
                </div>

                {/* Cliente */}
                <div className="cont-item">
                    <label className="label-crea-compra">Cliente</label>
                    <select
                        id="cliente"
                        value={items.cliente}
                        onChange={handleOnChange}
                        className="input-proveedor-anticipo"
                    >
                        <option value="">Seleccione uno</option>
                        {clientes?.map((p) => (
                            <option key={p._id} value={p.nombreApellido}>
                                {p.nombreApellido}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Monto */}
                <div className="cont-item">
                    <label className="label-crea-compra">Monto a pagar:</label>
                    <input
                        type="number"
                        id="totPedido"
                        value={items.totPedido}
                        onChange={handleOnChange}
                        className="input-montoPagar-anticipo"
                    />
                </div>

                {/* Detalle de Pago */}
                <div className="cont-item">
                    <label className="label-crea-compra">Cond de pago:</label>
                    <input
                        type="text"
                        id="condicion_pago"
                        value={items.condicion_pago}
                        onChange={handleOnChange}
                        className="input-detallePago-anticipo"
                    />
                </div>
            </div>

            <button type="submit" className="btn-crea-pedido anticipo">
                {tipoR === 'Pago' ? 'Modificar' : 'Crear Pago'}
            </button>
        </form>
    );
}

export default FormularioPagoCliente;
