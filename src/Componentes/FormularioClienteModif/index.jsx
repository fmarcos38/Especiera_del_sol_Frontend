import React, {  useState } from 'react';
import './estilos.css';
import { useDispatch,  } from 'react-redux';
import Swal from 'sweetalert2';
import { editaCliente, getAllClientes, } from '../../Redux/Actions';
import FormularioAlta from '../FormularioCliente';

const FormModificaCliente = ({c, setClienteAeditar }) => {
    
    const [formData, setFormData] = useState(c);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Está seguro de realizar los cambios?",
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
                dispatch(editaCliente(formData));
                dispatch(getAllClientes());
                setClienteAeditar(null);
                setErrors({});
            }
            window.location.reload();
        });        
    };

    
    return (
        <FormularioAlta 
            formData={formData} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit}
        />
    );
};

export default FormModificaCliente;
