import React, {  useState } from 'react';

import { useDispatch,  } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllProveedores, modificaProveedor, } from '../../Redux/Actions';
import FormularioCliente from '../FormularioCliente';

const FormularioProveedorModif = ({provAeditar, setProvAeditar }) => {
    
    const [formData, setFormData] = useState(provAeditar);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Está segur@ de realizar los cambios?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "OK!",
                    text: "Cambios realizados!!",
                    icon: "success"
                });
                dispatch(modificaProveedor(formData)); //cambiar
                dispatch(getAllProveedores());
                setProvAeditar(null);
                setErrors({});
            }
            window.location.reload();
        });        
    };

    
    return (
        <FormularioCliente 
            formData={formData} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit}
        />
    );
};

export default FormularioProveedorModif;
