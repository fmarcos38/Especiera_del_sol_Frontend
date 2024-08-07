import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';
import Swal from 'sweetalert2';
import './estilos.css';


function FormularioProductoAlta({operacion}) {

    const [input, setInput] = useState({
        nombre: "",
        precioKg: "",
        costo: "",
        envase: "",
        imagen: "",
        posicionLista: ""
    }); //estado inical inputs     
    const [errors, setErrors] = useState({}); //manejo de errore
    const [previewSource, setPreviewSource] = useState('');//estado vista previa imagen 
    const [listaProd, setListaProd] = useState([]); //estado para actualizar la lista de productos al agregar uno
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    //funcion verifica si ya existe el producto
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
        if (!input.costo) newErrors.costo = 'Costo es requerido';
        if (!input.envase) newErrors.envase = 'Envase es requerido';
        if (!input.posicionLista) newErrors.posicionLista = 'Posición requerido';
        //if (!previewSource) newErrors.imagen = 'La imágen es requerida';
        if (!input.posicionLista) newErrors.imagen = 'La posición es requerida';
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let prod = existeProducto(); 
        if(prod.nombre === ""){
            if (validate()) {
                try {
                    let formData = new FormData();
                    formData.append("nombre", input.nombre);
                    formData.append("precioKg", input.precioKg);
                    formData.append("costo", input.costo);
                    formData.append("envase", input.envase);
                    formData.append("posicionLista", input.posicionLista);
                    formData.append("imagen", input.imagen);//este nombre "imagen" es el q va en upload.single("imagen") en el back
                    
                    await fetch(`http://localhost:3001/productos`, {
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
                        costo: 0,
                        envase: 0,
                        imagen: "",
                        posicionLista: ""
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

    useEffect(() => {
        // Despachar acción para obtener todos los productos al montar el componente
        dispatch(getAllProds());
    }, [dispatch]);

    useEffect(() => {
        // Actualizar lista local de productos cuando el store de Redux se actualice
        setListaProd(productos);
    }, [productos]);

    return (
        <FormularioProducto
            operacion={operacion}
            productos={listaProd}
            handleSubmit={handleSubmit} 
            input={input} 
            handleChange={handleChange} 
            errors={errors} 
            previewSource={previewSource}
        />
    )
}

export default FormularioProductoAlta;