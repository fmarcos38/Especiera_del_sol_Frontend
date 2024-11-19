import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creaRemito, getAllClientes, } from '../../Redux/Actions';
import Swal from 'sweetalert2';

function FormularioPagoCliente() {

    const clientes = useSelector(state => state.clientes);
    //estado fecha creacion remito
    const [,setFechaCreacion] = useState(''); 
    const [items, setItems] = useState({
        fecha: '',
        cliente: "",
        cuit: 0,
        tipoRemito: "Pago",
        totPedido: 0,
        detallePago: "",        
    });
    const dispatch = useDispatch();

    // Función para formatear la fecha a 'YYYY-MM-DD'
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade 0 si es necesario
        const day = ('0' + fecha.getDate()).slice(-2); // Añade 0 si es necesario
        return `${year}-${month}-${day}`;
    };
    const handleOnChange = (e) => {
        setItems({...items, [e.target.id]: e.target.value});        
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!items.totPedido){
            Swal.fire({
                text: "Faltan datos!!",
                icon: "error"
            })
        } else {
            const dataBack = {
                fecha: items.fecha,
                totPedido: items.totPedido,
                cuit: items.cuit,
                cliente: items.cliente,
                tipoRemito: 'Venta',
            }
            dispatch(creaRemito(dataBack));
            setFechaCreacion(obtenerFechaActual()); // Restablecer la fecha a la actual
            setItems({
                fecha: '',
                cliente: "",
                cuit: 0,
                tipoRemito: "Pago",
                totPedido: 0,
                detallePago: "",        
            });
            Swal.fire({
                text: "Creado con exito!!",
                icon: "success"
            });
        }
    };

    // Actualiza la fecha inicial del formulario al montar el componente
    useEffect(() => {
        setItems((prevState) => ({
            ...prevState,
            fecha: obtenerFechaActual(),
        }));
    }, []);
    //trae clientes
    useEffect(()=>{
        dispatch(getAllClientes());
    },[dispatch]);
    //busco el cliente
    useEffect(()=>{
        if(items.cliente){
            const dataCliente = clientes.find(c => c.nombreApellido === items.cliente);
            if(dataCliente){
                setItems({...items, cuit: dataCliente.cuit});
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items.cliente]);//solo cuando cambie items.proveedor

    return (
        <form onSubmit={(e) => { handleOnSubmit(e)}} className='cont-formulario-anticipo'>
            <div className='cont-data-pago'>
                {/* elije la fecha para el remito */}
                <div className='cont-item'>
                    <label className='label-fecha-compra'>Fecha: </label>
                    <input
                        type='date'
                        id='fecha'
                        value={items.fecha}
                        onChange={(e) => { handleOnChange(e) }}
                        className='input-fecha-pago'
                    />
                </div>
                {/* Cliente */}
                <div className='cont-item'>
                    <label className='label-crea-compra'>Cliente</label>
                    <select
                        id='cliente'
                        value={items.cliente} // Asegúrate de que se reinicie el select
                        onChange={(e) => handleOnChange(e)}
                        className='input-proveedor-anticipo'
                    >
                        <option value="">Seleccione uno</option> {/* Opción predeterminada */}
                        {
                            clientes?.map(p => {
                                return (
                                    <option key={p._id} value={p.nombreApellido}>{p.nombreApellido}</option>
                                );
                            })
                        }
                    </select>
                </div>
                {/* Monto */}
                <div className='cont-item'>
                    <label className='label-crea-compra'>Monto a pagar:</label>
                    <input
                        type={'number'}
                        id='totPedido'
                        value={items.totPedido}
                        onChange={(e) => { handleOnChange(e) }}
                        className='input-montoPagar-anticipo'
                    />
                </div>
                {/* Forma de pago */}
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle de pago:</label>
                    <input
                        type={'text'}
                        id='detallePago'
                        value={items.detallePago}
                        onChange={(e) => { handleOnChange(e) }}
                        className='input-detallePago-anticipo'
                    />
                </div>
            </div>
            <button type='onSubmit' className='btn-crea-pedido anticipo'>Crear Pago</button>
        </form>
    )
}

export default FormularioPagoCliente;