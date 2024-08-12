import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { actual } from '../../URLs';
import FormularioCliente from '../FormularioCliente';


const FormClienteAlta = () => {

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        //quito msj de error si se llena el dato
        if(value){
            const errores = {...errors};
            delete errores[name];
            setErrors(errores);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();    
        try {
            const response = await axios.post(`${actual}/clientes`, formData);
    
            if (response.status === 201) {
                Swal.fire({
                    title: "OK",
                    text: "Cliente creado con éxito",
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
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al intentar crear el cliente",
                    icon: "error"
                });
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

export default FormClienteAlta;