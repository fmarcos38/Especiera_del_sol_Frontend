import React from 'react';
import './estilos.css';


function FormularioProducto({handleSubmit, input, handleChange, errors, previewSource}) {

    return (
        <div className='cont-formulario-producto'>
            <form className="cont-form-producto" onSubmit={handleSubmit}>
                {/* nombre y precio x kg */}
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Nombre del producto: </label>
                    <input
                        type="text"
                        name="nombre"
                        value={input.nombre}
                        onChange={handleChange}
                        className='input-nombre-form-modif-prod'
                    />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>

                {/* precio kg y envase */}
                <div className='cont-dos-items'>
                    <div className="cont-form-item-precio">
                        <label className='label-form-modif-prod'>Precio Público Kg: </label>
                        <input
                            type="number"
                            name="precioKg"
                            value={input.precioKg}
                            onChange={handleChange}
                            className='input-precio-form-modif-prod'
                        />
                        {errors.precioKg && <span className="error">{errors.precioKg}</span>}
                    </div>
                    <div className="cont-form-item-envase">
                        <label className='label-form-modif-prod'>Envase: </label>
                        <input
                            type="number"
                            name="envase"
                            value={input.envase}
                            onChange={handleChange}
                            className='input-envase-form-modif-prod'
                        />
                        {errors.envase && <span className="error">{errors.envase}</span>}
                    </div>
                    <div className="cont-form-item-precio">
                        <label className='label-form-modif-prod'>Costo Kg: </label>
                        <input
                            type="number"
                            name="costo"
                            value={input.costo}
                            onChange={handleChange}
                            className='input-precio-form-modif-prod'
                        />
                        {errors.costo && <span className="error">{errors.costo}</span>}
                    </div>
                </div>

                {/* imagen prod */}
                <div className="cont-img-vistaPrevia">
                    {/* foto */}
                    <div className="cont-imagen-prod">
                        <label className='label-form-modif-prod'>Seleccione una imágen para el producto:</label>
                        <input className="input-carga-img" name='imagen' type="file" accept="imagen/*" onChange={handleChange} />
                        {errors.imagen && <span className="error">{errors.imagen}</span>}
                    </div>

                    {/* muestra foto */}
                    <div>
                        <img src={previewSource} alt="Sin cargar" className="pre-imagen-prod" />
                    </div>

                    {/* para el form modificar muestra la img q ya tiene */}
                    <div >
                        <img src={input.imagen} alt={""} className="pre-imagen-prod" />
                    </div>
                </div>

                {/* botón */}
                <div className='cont-btn-enviar-formCliente'>
                    <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default FormularioProducto