import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';
import Swal from 'sweetalert2';
import './estilos.css';


function FormularioAltaProducto() {

    const [input, setInput] = useState({
        nombre: "",
        precioKg: 0,
        envase: 0,
        imagen: "",
    }); //estado inical inputs 
    
    const [errors, setErrors] = useState({}); //manejo de errore
    const [previewSource, setPreviewSource] = useState('');//estado vista previa imagen 
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    //funcion verifica si ya existe un cliente con mismo CUIT
    const existeProducto = () => {
        let existeProd = {};
        existeProd = productos.find(p => p.nombre === input.nombre);
        if(existeProd){ return existeProd; }
        return existeProd = {nombre: ""};
    };

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
    //funcion valida inputs
    const validate = () => {
        const newErrors = {};

        if (!input.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!input.precioKg) newErrors.precioKg = 'Precio x Kg es requerido';
        if (!input.envase) newErrors.envase = 'Envase es requerido';
        if (!previewSource) newErrors.imagen = 'La imágen es requerida';
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let prod = existeProducto(); 
        if(prod.nombre === ""){
            if (validate()) {
                try {
                    let formData = new FormData();
                    formData.append("nombre", input.nombre);
                    formData.append("precioKg", input.precioKg);
                    formData.append("envase", input.envase);
                    formData.append("imagen", input.imagen);//este nombre "imagen" es el q va en upload.single("imagen") en el back

                    fetch(`http://localhost:3001/productos`, {
                        method: "POST",
                        body: formData,
                    });
                    Swal.fire({
                        title: "OK",
                        text: "Producto creado con exito",
                        icon: "success"
                    });
                    setInput({
                        nombre: "",
                        precioKg: 0,
                        envase: 0,
                        imagen: "",
                    });
                    dispatch(getAllProds());
                    setPreviewSource('');
                } catch (error) {
                    console.log(error);
                }
            }
        }else{
            Swal.fire({
                title: "Ya existe ese Producto",
                icon: "error"
            });
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

export default FormularioAltaProducto;