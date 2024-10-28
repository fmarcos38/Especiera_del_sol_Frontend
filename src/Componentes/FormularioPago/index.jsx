import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creaAnticipo, getAllProveedores } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import './estilos.css';

function FormularioPago() {

    const proveedores = useSelector(state => state.proveedores);
    //estado fecha creacion remito
    const [fechaCreacion, setFechaCreacion] = useState(''); 
    const [items, setItems] = useState({
        fecha: '',
        proveedor: "",
        detalle: "Pago",
        total: 0,
        estado: "Pago",
        detallePago: "",
        cuit: ""
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
    const handleOnChangeFechaCreacion = (e) => {
        setFechaCreacion(e.target.value);
    };
    const handleOnChange = (e) => {
        if(e.target.id === 'proveedor'){
            setItems({...items, proveedor: e.target.value});
        }else{
            setItems({...items, [e.target.id]: e.target.value});
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!items.total || !items.detallePago){
            Swal.fire({
                text: "Faltan items!!",
                icon: "error"
            })
        }else{
            const data = {
                ...items,
                fecha: fechaCreacion,
            }
            dispatch(creaAnticipo(data));
            setItems({
                fecha: '',
                proveedor: "",
                total: 0,
                detallePago: "",
                cuit: ""
            });
            setFechaCreacion(obtenerFechaActual()); // Restablecer la fecha a la actual
            Swal.fire({
                text: "Creado con exito!!",
                icon: "success"
            });
        }
    };

    //actualiza a la fecha actual
    useEffect(()=>{
        setFechaCreacion(obtenerFechaActual());
    }, []);
    useEffect(()=>{
        dispatch(getAllProveedores());
    },[dispatch]);

    useEffect(()=>{
        if(items.proveedor){
            const dataProv = proveedores.find(p => p.nombreApe === items.proveedor);
            if(dataProv){
                setItems({...items, cuit: dataProv.cuit});
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items.proveedor]);//solo cuando cambie items.proveedor

    return (
        <form onSubmit={(e) => { handleOnSubmit(e)}} className='cont-formulario-anticipo'>
            <div className='cont-data-pago'>
                {/* elije la fecha para el remito */}
                <div className='cont-item'>
                    <label className='label-fecha-compra'>Fecha: </label>
                    <input
                        type='date'
                        id='fechaCreacionRemito'
                        value={fechaCreacion}
                        onChange={(e) => { handleOnChangeFechaCreacion(e) }}
                        className='input-fecha-pago'
                    />
                </div>
                {/* Proveedor */}
                <div className='cont-item'>
                    <label className='label-crea-compra'>Proveedor</label>
                    <select
                        id='proveedor'
                        value={items.proveedor} // Asegúrate de que se reinicie el select
                        onChange={(e) => handleOnChange(e)}
                        className='input-proveedor-anticipo'
                    >
                        <option value="">Seleccione uno</option> {/* Opción predeterminada */}
                        {
                            proveedores?.map(p => {
                                return (
                                    <option key={p._id} value={p.nombre + " " + p.apellido}>{p.nombre + " " + p.apellido}</option>
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
                        id='total'
                        value={items.total}
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

export default FormularioPago;