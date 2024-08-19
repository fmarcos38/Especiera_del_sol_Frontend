import React from 'react';
import './estilos.css';

const FormularioCliente = ({formData, errors, handleChange, handleSubmit}) => {


    return (
        <form className="client-form" onSubmit={handleSubmit}>
            {/* nombre y apellido */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                    {errors.apellido && <span className="error">{errors.apellido}</span>}
                </div>
            </div>
            
            {/* tel e email */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    {errors.telefono && <span className="error">{errors.telefono}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
            </div>
            
            {/* cuidad y direcc */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />
                    {errors.ciudad && <span className="error">{errors.ciudad}</span>}
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    {errors.direccion && <span className="error">{errors.direccion}</span>}
                </div>
            </div>

            {/* razon social y cuit*/}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Razón Social</label>
                    <input
                        type="text"
                        name="razonSocial"
                        value={formData.razonSocial}
                        onChange={handleChange}
                    />
                    {errors.razonSocial && <span className="error">{errors.razonSocial}</span>}
                </div>
                <div className="form-group">
                    <label>CUIT</label>
                    <input
                        type="number"
                        name="cuit"
                        value={formData.cuit}
                        onChange={handleChange}
                    />
                    {errors.cuit && <span className="error">{errors.cuit}</span>}
                </div>
            </div>            

            {/* iva y condicion de pago */}            
            <div className="form-group-iva">
                <label>I.V.A</label>
                <input
                    type="text"
                    name="iva"
                    value={formData.iva}
                    onChange={handleChange}
                />
                {errors.iva && <span className="error">{errors.iva}</span>}
            </div>

            {/* botón */}
            <div className='cont-btn-enviar-formCliente'>
                <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
            </div>
        </form>
    );
};

export default FormularioCliente;
