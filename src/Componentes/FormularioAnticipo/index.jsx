import React, { useEffect, useState } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { creaAnticipo, getAllProveedores } from '../../Redux/Actions';
import Swal from 'sweetalert2';


function FormularioAnticipo() {

    const proveedores = useSelector(state => state.proveedores);
    const [items, setItems] = useState({
        proveedor: "",
        detalle: "Anticipo",
        total: 0,
        detallePago: "",
        estado: "Pago"
    }); 
    const dispatch = useDispatch();

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
            dispatch(creaAnticipo(items));
            setItems({
                proveedor: "",
                detalle: "Anticipo",
                total: 0,
                detallePago: "",
                estado: "Pago"
            })
        }
    };

    useEffect(()=>{
        dispatch(getAllProveedores());
    },[dispatch]);

    return (
        <form onSubmit={(e) => { handleOnSubmit(e)}} className='cont-formulario-anticipo'>
            <div className='cont-inputs-anticipo'>
                <div className='cont-item'>
                    <label>Proveedor</label>
                    <select 
                        id='proveedor' 
                        onChange={(e) => handleOnChange(e)} 
                        className='input-detalle-anticipo'
                    >
                    <option>Seleccione uno</option>
                        {
                            proveedores?.map(p => {
                                return (
                                <option key={p._id} value={p.nombre+" "+p.apellido}>{p.nombre+" "+p.apellido}</option>
                            )})
                        }
                    </select>
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle:</label>
                    <input 
                        type={'text'} 
                        value={items.detalle} 
                        onChange={(e) => { handleOnChange(e) }} 
                        className='input-detalle-anticipo' 
                    />
                </div>
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
            <button type='onSubmit' className='btn-crea-pedido anticipo'>Crear</button>
        </form>
    )
}

export default FormularioAnticipo