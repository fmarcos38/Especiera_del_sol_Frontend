import React, { useState } from 'react';
import './estilos.css';


function FormularioAnticipo() {

    const [items, setItems] = useState({})
    const handleOnChange = () => {};
    const handleOnSubmit = () => {};


    return (
        <form onSubmit={(e) => { handleOnSubmit(e)}} className='cont-formulario-anticipo'>
            <div className='cont-inputs-anticipo'>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-detalle-anticipo' />
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Monto a pagar:</label>
                    <input type={'number'} value={''} onChange={() => { handleOnChange() }} className='input-montoPagar-anticipo' />
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle de pago:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-detallePago-anticipo' />
                </div>
            </div>
            <button type='onSubmit' className='btn-crea-pedido anticipo'>Crear</button>
        </form>
    )
}

export default FormularioAnticipo