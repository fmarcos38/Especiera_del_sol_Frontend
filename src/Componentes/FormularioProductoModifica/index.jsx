import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './estilos.css';
import { getAllProds } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';


function FormularioModifProducto({prod, setProdAmodif}) {

    const [input, setInput] = useState(prod);     
    const [errors, setErrors] = useState({});
    const [previewSource, setPreviewSource] = useState('');
    const dispatch = useDispatch();

    //funcion para manipulación de la pre-imagen
    const previewFile = (file) => {
        const reader = new FileReader();//lector de archivo
        reader.readAsDataURL(file);//convierte la img en una url
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "imagen"){
            setInput({...input, imagen: e.target.files[0]});
            previewFile(e.target.files[0]);//invoco la funcio q muestra la pre-imagen
        }else{
            setInput({...input, [name]: value});
        }

        //quito msj de error si se llena el dato
        if(value){
            const errores = {...errors};
            delete errores[name];
            setErrors(errores);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("nombre", input.nombre);
            formData.append("precioKg", input.precioKg);
            formData.append("envase", input.envase);
            formData.append("imagen", input.imagen);//este nombre "imagen" es el q va en upload.single("imagen") en el back

            fetch(`http://localhost:3001/productos/${input._id}`, {
                method: "PUT",
                body: formData,
            });
            Swal.fire({
                title: "OK",
                text: "Producto modificado con exito",
                icon: "success"
            });
            dispatch(getAllProds());
            setPreviewSource('');
            setProdAmodif(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormularioProducto
            handleSubmit={handleSubmit}
            input={input}
            handleChange={handleChange}
            errors={errors}
            previewSource={previewSource}
        />
    )
}

export default FormularioModifProducto