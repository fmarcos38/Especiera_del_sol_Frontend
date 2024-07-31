import React from 'react';
import './estilos.css';

function FormularioCompra({
    tipoOperacion, handleOnSubmit, handleOnChangeDatosCompra, proveedores, numUltRemito, compra, 
    calcTotCompra, items, handleOnChangeItems, productos, handleOnClickAgregaItem
}) {
    return (
        <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-compra'>
            {/* dato compra */}
            <div className='cont-items-pedido'>
                <h2 className='titulos-form-compra'>Carga datos de la compra</h2>
                {/* num remito - prov - detalle */}
                <div className='cont-compra-detalle-proveed'>
                    {/* si es tipoOperacio es compra Proveedor -> un select | SI es  modifica -> un input*/}
                    {
                        tipoOperacion === 'compra' ? (
                            <div className='cont-item'>
                                <label className='label-crea-compra'>Proveedor:</label>
                                <select
                                    id="proveedor"
                                    onChange={(e) => handleOnChangeDatosCompra(e)}
                                    className='input-pedido'
                                >
                                    <option>Seleccione prov</option>
                                    {
                                        proveedores?.map(p => {
                                            return (
                                                <option
                                                    key={p._id}
                                                    value={p.nombre + " " + p.apellido}
                                                >
                                                    {p.nombre + " " + p.apellido}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        ) : (
                            <div className='cont-item'>
                                <label className='label-crea-compra'>Proveedor</label>
                                <input
                                    type={'text'}
                                    value={compra.proveedor}
                                    className='input-pedido'
                                />
                            </div>
                        )
                    }
                    {/* CUIT del proveedor */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>CUIT:</label>
                        <input
                            type={'number'}
                            id='cuit'
                            value={compra.cuit}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                    {/* num compra */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>N° Compra:</label>
                        <input
                            type={'number'}
                            id='numCompra'
                            value={numUltRemito}
                            className='input-pedido numCompra'
                        />
                    </div>
                    {/* num remito proveedor */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>N° Remito Proveedor:</label>
                        <input
                            type={'number'}
                            id='numRemitoProveedor'
                            value={compra.numRemitoProveedor}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido numRemitoProveedor'
                        />
                    </div>
                    {/* transporte */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Transporte:</label>
                        <input
                            type={'text'}
                            id='transporte'
                            value={compra.transporte}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido numRemitoProveedor'
                        />
                    </div>
                </div>
                {/* producto - kg comprados - precio unitario - tot compra */}
                <div className='cont-compra-detalle-proveed'>
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Producto:</label>
                        <input
                            type={'text'}
                            id='producto'
                            value={compra.producto}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Cant Kg:</label>
                        <input
                            type={'number'}
                            id='cantidad'
                            value={compra.cantidad}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Unitario:</label>
                        <input
                            type={'text'}
                            id='unitario'
                            value={compra.unitario}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Total:</label>
                        <input
                            type={'number'}
                            id='total'
                            value={calcTotCompra()}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                </div>
                {/* detalle pago y observaciones*/}
                <div className='cont-compra-detalle-proveed'>
                    <div className='cont-item'>
                        <label className='label-crea-compra'>Detalle Pago:</label>
                        <input
                            type={'text'}
                            id='detallePago'
                            value={compra.detallePago}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido'
                        />
                    </div>
                </div>
            </div>

            {/* items compra */}
            <div className='cont-items-form-compra'>
                <h2 className='titulos-form-compra'>Carga items de la compra</h2>
                <div className='cont-items-compra'>
                    {/* cantidad */}
                    <div className='cont-item-cantidad'>
                        <label className='label-crea-compra'>Cantidad:</label>
                        <input
                            type='number'
                            id='cantidad'
                            value={items.cantidad}
                            onChange={(e) => handleOnChangeItems(e)}
                            className='input-cant-formulario'
                        />
                    </div>
                    {/* detalle */}
                    <div className='cont-item-producto'>
                        <label className='label-crea-compra'>Nombre del Producto:</label>
                        <input
                            type="text"
                            id='detalle'
                            value={items.detalle}
                            onChange={(e) => { handleOnChangeItems(e) }}
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
                        <label className='label-crea-compra'>Precio Unitario:</label>
                        <input
                            type='number'
                            id='unitario'
                            value={items.unitario}
                            onChange={(e) => handleOnChangeItems(e)}
                            className='input-unitario-formulario'
                        />
                    </div>
                    <div className='cont-item-importe'>
                        <label className='label-crea-compra'>Importe:</label>
                        <input
                            type='number'
                            id='importe'
                            value={items.importe}
                            className='input-importe-formulario'
                        />
                    </div>
                </div>
                <button
                    type='button'
                    onClick={(e) => handleOnClickAgregaItem(e)}
                    className='btn-cargarProd btnCompra'
                >
                    Cargar producto
                </button>
            </div>

            {/* botón crea compra */}
            <button type='onSubmit' className='btn-crea-pedido compra'>
                {
                    tipoOperacion === 'compra' ? "Crear compra" : "Modifica compra"
                }
            </button>
        </form>
    )
}

export default FormularioCompra;
