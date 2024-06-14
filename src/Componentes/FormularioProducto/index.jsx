import React from 'react';
import './estilos.css';


function FormularioProducto({handleSubmit, input, handleChange, errors, previewSource}) {

    return (
        <form className="client-form" onSubmit={handleSubmit}>
            {/* nombre y precio x kg */}
            <div className="form-group">
                <label>Nombre del producto</label>
                <input
                    type="text"
                    name="nombre"
                    value={input.nombre}
                    onChange={handleChange}
                />
                {errors.nombre && <span className="error">{errors.nombre}</span>}
            </div>

            {/* precio kg y envase */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Precio Kg</label>
                    <input
                        type="number"
                        name="precioKg"
                        value={input.precioKg}
                        onChange={handleChange}
                    />
                    {errors.precioKg && <span className="error">{errors.precioKg}</span>}
                </div>
                <div className="form-group">
                    <label>Envase</label>
                    <input
                        type="number"
                        name="envase"
                        value={input.envase}
                        onChange={handleChange}
                    />
                    {errors.envase && <span className="error">{errors.envase}</span>}
                </div>
            </div>

            {/* imagen prod */}
            <div className="cont-img-vistaPrevia">
                {/* foto */}
                <div className="cont-imagen-prod">
                    <label className="label-img">Seleccione una imágen para el produto:</label>
                    <input className="input-carga-img" name='imagen' type="file" accept="imagen/*" onChange={handleChange} />
                    {errors.imagen && <span className="error">{errors.imagen}</span>}
                </div>

                {/* muestra foto */}
                <div>
                    <img src={previewSource} alt="Sin cargar" className="pre-imagen-prod" />
                </div>

                {/* para el form modificar muestra la img q ya tiene */}
                <div >                    
                    <img src={input.imagen} alt={""} className="imagen-prod"/> 
                </div>                
            </div>

            {/* botón */}
            <div className='cont-btn-enviar-formCliente'>
                <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
            </div>
        </form>
    )
}

export default FormularioProducto