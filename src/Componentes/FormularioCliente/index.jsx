import React, { useState } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createCliente, getAllClientes } from '../../Redux/Actions';

const FormCliente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        razonSocial: '',
        telefono: '',
        email: '',
        ciudad: '',
        direccion: '',
        iva:'',
        cuit: '',
    });
    const [errors, setErrors] = useState({});
    const allClientes = useSelector(state => state.clientes);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'Apellido es requerido';
        if (!formData.razonSocial) newErrors.razonSocial = 'Razón Social es requerida';
        if (!formData.ciudad) newErrors.ciudad = 'Ciudad es requerida';
        if (!formData.direccion) newErrors.direccion = 'Dirección es requerida';
        if (!formData.iva) newErrors.iva = 'IVA es requerido';
        if (!formData.cuit) newErrors.cuit = 'CUIT es requerido';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    //funcion verifica si ya existe un cliente con mismo CUIT
    const verifCliente = () => {
        let buscoCliente = {};
        buscoCliente = allClientes.find(c => c.cuit === formData.cuit);
        if(buscoCliente){ return buscoCliente; }
        return buscoCliente = {nombre: ""};
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let existeCliente = verifCliente(); console.log("existeC: ", existeCliente)
        if(existeCliente.nombre === ""){
            if (validate()) {
                dispatch(createCliente(formData));
                Swal.fire({
                    title: "OK",
                    text: "Cliente creado con exito",
                    icon: "success"
                });
                setFormData({
                    nombre: '',
                    apellido: '',
                    razonSocial: '',
                    telefono: '',
                    email: '',
                    ciudad: '',
                    direccion: '',
                    cuit: '',
                });
                dispatch(getAllClientes());
            }            
        }else{
            Swal.fire({
                title: "Ya existe un Cliente",
                text: "Prueba con otro CUIT",
                icon: "error"
            });
        }
        
    };

    
    return (
        <form className="client-form" onSubmit={handleSubmit}>
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
                <label>Teléfono</label>
                <input
                    type="text"
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
            <div className="form-group">
                <label>CUIT</label>
                <input
                    type="text"
                    name="iva"
                    value={formData.iva}
                    onChange={handleChange}
                />
                {errors.cuit && <span className="error">{errors.cuit}</span>}
            </div>
            <div className="form-group">
                <label>CUIT</label>
                <input
                    type="text"
                    name="cuit"
                    value={formData.cuit}
                    onChange={handleChange}
                />
                {errors.cuit && <span className="error">{errors.cuit}</span>}
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default FormCliente;
