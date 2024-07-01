import React, { useState } from 'react';
import './estilos.css';


function FormularioCompras() {

    const [items, setItems] = useState({})
    const handleOnChange = () => {};
    const handleOnSubmit = () => {};


    return (        
        <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-items-form-compra'>
            <div className='cont-item'>
                <label className='label-crea-compra'>N° Remito:</label>
                <input type={'number'} value={''} onChange={() => { handleOnChange() }} className='input-pedido numRemito' />
            </div>

            <div className='cont-items-pedido'>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Kg comprados:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Unitario:</label>
                    <input type={'number'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Total:</label>
                    <input type={'number'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>
            </div>

            <div className='cont-items-pedido'>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>

                <div className='cont-item'>
                    <label className='label-crea-compra'>Observaciones:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>
                <div className='cont-item'>
                    <label className='label-crea-compra'>Detalle de pago:</label>
                    <input type={'text'} value={''} onChange={() => { handleOnChange() }} className='input-pedido' />
                </div>
            </div>
            <button type='onSubmit' className='btn-crea-pedido compra'>Crear</button>
        </form>        
    )
}

export default FormularioCompras