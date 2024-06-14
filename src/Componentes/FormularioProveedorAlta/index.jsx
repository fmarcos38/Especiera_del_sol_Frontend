import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creaProveedor, getAllProveedores } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import FormularioCliente from '../FormularioCliente';


function FomularioProveedorAlta() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        razonSocial: '',
        telefono: 0,
        email: '',
        ciudad: '',
        direccion: '',
        iva: '',
        cuit: 0,
    });
    const [errors, setErrors] = useState({});
    const allProveedores = useSelector(state => state.proveedores);
    const dispatch = useDispatch();

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

    //funcion verifica si ya existe un cliente con mismo CUIT
    const verifCliente = () => {
        let buscoCliente = {};
        buscoCliente = allProveedores.find(c => c.cuit === formData.cuit);
        if (buscoCliente) { return buscoCliente; }
        return buscoCliente = { nombre: "" };
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let existeCliente = verifCliente();
        if (existeCliente.nombre === "") {
            if (validate()) {
                dispatch(creaProveedor(formData));
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
                    iva: '',
                    cuit: '',
                });
                dispatch(getAllProveedores());
            }
        } else {
            Swal.fire({
                title: "Ya existe un Cliente",
                text: "Prueba con otro CUIT",
                icon: "error"
            });
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