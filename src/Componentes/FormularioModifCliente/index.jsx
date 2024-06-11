import React, { useEffect, useState } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllClientes, getClienteByID, resetCliente } from '../../Redux/Actions';

const FormModificaCliente = ({_id}) => {

    const cliente = useSelector(state => state.cliente); console.log("client:", cliente)
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: cliente.apellido,
        razonSocial: cliente.razonSocial,
        telefono: cliente.telefono,
        email: cliente.email,
        ciudad: cliente.ciudad,
        direccion: cliente.direccion,
        iva: cliente.iva,
        cuit: cliente.cuit, 
    });   
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "success"
        });
        dispatch(getAllClientes());
    };

    useEffect(()=>{
        dispatch(getClienteByID(_id));

        return () => {dispatch(resetCliente());}

    },[_id, dispatch]);
    
    return (
        <form className="client-form" onSubmit={handleSubmit}>
            {/* nombre y apellido */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
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
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
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
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
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
                </div>
                <div className="form-group">
                    <label>CUIT</label>
                    <input
                        type="text"
                        name="cuit"
                        value={formData.cuit}
                        onChange={handleChange}
                    />
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
            </div>
            {/* botón */}
            <div className='cont-btn-enviar-formCliente'>
                <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
            </div>
        </form>
    );
};

export default FormModificaCliente;
