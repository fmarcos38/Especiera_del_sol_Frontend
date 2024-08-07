import React, { useEffect } from 'react';
import './estilos.css';

function FormularioProducto({ operacion, productos, handleSubmit, input, handleChange, errors, previewSource }) {

    useEffect(() => {
        // Este efecto asegura que el valor de unidadMedida se actualiza cuando input cambia
    }, [input]);

    return (
        <div className='cont-formulario-producto'>
            <form className="cont-form-producto" onSubmit={handleSubmit}>
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Nombre del producto: </label>
                    <input
                        type="text"
                        name="nombre"
                        value={input.nombre || ''}
                        onChange={handleChange}
                        className='input-form-prod'
                    />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Unidad medida: </label>
                    <select name='unidadMedida' onChange={handleChange} className='input-form-prod' value={input.unidadMedida || ''}>
                        <option value=''>Elija opc</option>
                        <option value='kg'>Kg</option>
                        <option value='unidad'>Unidad</option>
                    </select>
                    {errors.unidadMedida && <span className="error">{errors.unidadMedida}</span>}
                </div>
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Precio Público Kg: </label>
                    <input
                        type="number"
                        name="precioKg"
                        value={input.precioKg || ''}
                        onChange={handleChange}
                        className='input-form-prod'
                    />
                    {errors.precioKg && <span className="error">{errors.precioKg}</span>}
                </div>
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Envase: </label>
                    <input
                        type="number"
                        name="envase"
                        value={input.envase || ''}
                        onChange={handleChange}
                        className='input-form-prod'
                    />
                    {errors.envase && <span className="error">{errors.envase}</span>}
                </div>
                <div className="cont-form-item-nombre">
                    <label className='label-form-modif-prod'>Costo Kg: </label>
                    <input
                        type="number"
                        name="costo"
                        value={input.costo || ''}
                        onChange={handleChange}
                        className='input-form-prod'
                    />
                    {errors.costo && <span className="error">{errors.costo}</span>}
                </div>
                <div className='cont-form-item-nombre'>
                    <label className='label-form-modif-prod'>Posición en la Lista de Productos: </label>
                    <input
                        type='number'
                        name={'posicionLista'}
                        value={input.posicionLista || ''}
                        onChange={handleChange}
                        className='input-form-prod'
                    />
                    {errors.posicionLista && <span className="error">{errors.posicionLista}</span>}
                </div>
                <div className="cont-img-vistaPrevia">
                    <div className="cont-imagen-prod">
                        <label className='label-form-modif-prod'>Seleccione una imágen para el producto:</label>
                        <input className="input-carga-img" name='imagen' type="file" accept="imagen/*" onChange={handleChange} />
                    </div>
                    <div>
                        {
                            previewSource ?
                                <img src={previewSource} alt="Sin cargar" className="pre-imagen-prod" />
                                :
                                <img src={input.imagen} alt="Sin cargar" className="pre-imagen-prod" />
                        }
                    </div>
                </div>
                <div className='cont-btn-enviar-formCliente'>
                    <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
                </div>
            </form>
            <div className='cont-lista-prods'>
                <table className='client-table' style={{ margin: '0' }}>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Prod</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos?.map(p => {
                                return (
                                    <tr key={p._id}>
                                        <td>{p.posicionLista}</td>
                                        <td>{p.nombre}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormularioProducto;
