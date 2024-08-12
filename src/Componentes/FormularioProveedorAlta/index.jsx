import React, { useState } from 'react';
import Swal from 'sweetalert2';
import FormularioCliente from '../FormularioCliente';
import axios from 'axios';
import { actual } from '../../URLs';


function FomularioProveedorAlta() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        razonSocial: '',
        telefono: '',
        email: '',
        ciudad: '',
        direccion: '',
        iva: '',
        cuit: '',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        //quito msj de error si se llena el dato
        if (value) {
            const errores = { ...errors };
            delete errores[name];
            setErrors(errores);
        }
    };

    //funcion valida inputs
    const validate = () => {
        const newErrors = {};

        if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'Apellido es requerido';
        if (!formData.razonSocial) newErrors.razonSocial = 'Razón Social es requerida';
        if (!formData.telefono) newErrors.telefono = 'Telefono es requerido';
        if (!formData.email) newErrors.email = 'Email es requerido';
        if (!formData.ciudad) newErrors.ciudad = 'Ciudad es requerida';
        if (!formData.direccion) newErrors.direccion = 'Dirección es requerida';
        if (!formData.iva) newErrors.iva = 'IVA es requerido';
        if (!formData.cuit) newErrors.cuit = 'CUIT es requerido';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(validate()){
            try {
                const response = await axios.post(`${actual}/proveedores`, formData);
        
                if (response.status === 201) {
                    Swal.fire({
                        title: "OK",
                        text: "Proveedor creado con éxito",
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
                        iva: ''
                    });
                }
            }catch(error){
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        title: "Error",
                        text: error.response.data.message,
                        icon: "error"
                    });
                }else{
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al intentar crear el proveedor",
                        icon: "error"
                    });
                }
            }
        }

    };


    return (
        <FormularioCliente
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default FomularioProveedorAlta