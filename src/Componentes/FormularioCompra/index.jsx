import React from 'react';
import './estilos.css';

function FormularioCompra({
    handleOnChangeNumCompra, tipoOperacion, handleOnSubmit, handleOnChangeDatosCompra, proveedores, numUltRemito, compra, 
    calcTotCompra, items, handleOnChangeItems, productos, handleOnClickAgregaItem, fechaCreacion, handleOnChangeFechaCreacion
}) {    
    return (
        <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-compra'>
            {/* dato compra */}
            <div className='cont-items-pedido'>
                <h2 className='titulos-form-compra'>Carga datos de la compra</h2>
                {/* elije la fecha para el remito */}
                <div className='cont-fecha-compra'>
                        <label className='label-fecha-compra'>Fecha: </label>
                        <input
                            type='date'
                            id='fechaCreacionRemito'
                            value={fechaCreacion}
                            onChange={(e) => { handleOnChangeFechaCreacion(e) }}
                            className='input-cuit-remito'
                        />
                </div>
                {/* num remito - prov - detalle */}
                <div className='cont-compra-detalle-proveed'>
                    {/* si tipoOperacio es compra Proveedor -> un select | SI es  modifica -> un input*/}
                    {
                        tipoOperacion === 'compra' ? (
                            <div className='cont-item'>
                                <label className='label-crea-compra'>Proveedor:</label>
                                <select
                                    id="proveedor"
                                    onChange={(e) => handleOnChangeDatosCompra(e)}
                                    className='input-pedido nombre-proveedor-compra'
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
                    {/* num compra */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>N° Compra:</label>
                        <input
                            type={'number'}
                            id='numCompra'
                            value={numUltRemito}
                            onChange={(e) => {handleOnChangeNumCompra(e)}}
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
                </div>

                {/* items compra */}
                <div className='cont-items-form-compra'>
                    <h2 className='titulos-form-compra'>Carga items de la compra</h2>
                    <div className='cont-items-compras'>
                        {/* detalle */}
                        <div className='cont-item-producto'>
                            <label className='label-crea-compra'>Nombre del Producto:</label>
                            <input
                                type="text"
                                id='detalle'
                                value={items.detalle}
                                onChange={(e) => { handleOnChangeItems(e) }}
                                list="product-list"
                                className='input-item-detalle-compra input-pedido'
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
                        <div className='cont-cant-precio-impo'>
                            {/* cantidad */}
                        <div className='cont-item-cantidad'>
                            <label className='label-crea-compra'>Cantidad:</label>
                            <input
                                type='number'
                                id='cantidad'
                                value={items.cantidad}
                                onChange={(e) => handleOnChangeItems(e)}
                                className='input-item-compra-cantidad input-pedido'
                            />
                        </div>
                        {/* Precio unitario */}
                        <div className='cont-item-unitario'>
                            <label className='label-crea-compra'>Precio Unitario:</label>
                            <input
                                type='number'
                                id='unitario'
                                value={items.unitario}
                                onChange={(e) => handleOnChangeItems(e)}
                                className='input-item-compra-precio input-pedido'
                            />
                        </div>
                        {/* importe */}
                        <div className='cont-item-importe'>
                            <label className='label-crea-compra'>Importe:</label>
                            <input
                                type='number'
                                id='importe'
                                value={items.importe}
                                className='input-item-compra-importe input-pedido'
                            />
                        </div>
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

