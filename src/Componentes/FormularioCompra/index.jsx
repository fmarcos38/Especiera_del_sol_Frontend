import React, { useState } from 'react';
import './estilos.css';
import { useSelector } from 'react-redux';


function FormularioCompras() {

    const productos = useSelector(state => state.productos);
    const [items, setItems] = useState({});
    const [pedido, setPedido] = useState([]);

    const handleOnChange = () => {};
    const handleOnClickAgregaItem = () => {};
    const handleOnSubmit = () => {};


    return (
        <div className='cont-vista-compra'>
            <h2>Carga de items para la {/* {tipo} */} y creación del Remito</h2>

            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-items-form-compra'>
                {/* num remito */}
                <div className='cont-item'>
                    <label className='label-crea-compra'>N° Remito:</label>
                    <input type={'number'} value={''} onChange={() => { handleOnChange() }} className='input-pedido numRemito' />
                </div>
                {/* items compra */}
                <div className='cont-items-form'>
                    {/* cantidad */}
                    <div className='cont-item-cantidad'>
                        <label className='label-formulario'>Cantidad:</label>
                        <input 
                            type='number' 
                            id='cantidad' 
                            /* value={cantidad} */ 
                            /* onChange={(e) => handleChangeCantidad(e)}  */
                            className='input-cant-formulario' 
                        />
                    </div>
                    {/* detalle */}
                    <div className='cont-item-producto'>
                        <label className='label-formulario'>Nombre del Producto:</label>
                        <input
                            type="text"
                            id='detalle'
                            /* value={detalle}
                            onChange={(e) => { handleChangeDetalle(e) }} */
                            list="product-list"
                            className='input-producto-formulario'
                        />
                        {/* lista q aparecerá en el input */}
                        <datalist id="product-list">
                            {
                                productos.map(p => (
                                    <option key={p._id} value={p.nombre} />
                                ))
                            }
                        </datalist>
                    </div>
                    {/* Precio unitario */}
                    <div className='cont-item-unitario'>
                        <label className='label-formulario'>Precio Unitario:</label>
                        <input 
                            type='number' 
                            id='unitario' 
                            /* value={unitario} 
                            onChange={(e) => handleChangeUnitario(e)} */ 
                            className='input-unitario-formulario'
                        />
                    </div>
                    <div className='cont-item-importe'>
                        <label className='label-formulario'>Importe:</label>
                        <input 
                            type='number' 
                            id='importe' 
                            /* value={importe} 
                            onChange={(e) => handleChangeImporte(e)}  */
                            className='input-importe-formulario'
                        />
                    </div>
                    <button onClick={(e) => handleOnClickAgregaItem(e)} className='btn-cargarProd'>Cargar producto</button>
                </div>
                {/* dato compra */}
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

            {/* muestra pedido */}
            <h2>Items pedido</h2>
            <div className='cont-tabla-items-pedido'>
                <table className="client-table">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Detalle</th>
                            <th>P.Unitario</th>
                            <th>Importe</th>
                            <th style={{ display: 'flex', justifyContent: 'center' }}>Elimina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedido?.map(item => {
                                return (
                                    <tr key={item.detalle}>
                                        <td>{item.cantidad}</td>
                                        <td>{item.detalle}</td>
                                        <td>{item.unitario}</td>
                                        <td>{item.importe}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button /* onClick={() => {handleElimnimaItem(item._id)}} */ className='btn-elimina-item-pedido'>
                                                Elimnar{/* <DeleteIcon className='icono-elimina-item'/> */}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                    <tfoot>
                        <td>TOTAL</td>
                        <td></td>
                        <td></td>
                        <td>{/* {calculaTotPedido()} */}tot pedido</td>
                    </tfoot>
                </table>
            </div>
        </div>        
                
    )
}

export default FormularioCompras