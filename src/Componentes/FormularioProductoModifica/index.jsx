import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds, getProductoById } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './estilos.css';


function FormularioModifProducto() {

    const {_id} = useParams();
    const prod = useSelector(state => state.producto);
    const [input, setInput] = useState({});     
    const [errors, setErrors] = useState({});
    const [previewSource, setPreviewSource] = useState('');
    const productos = useSelector(state => state.productos);
    const [listaProd, setListaProd] = useState([]);
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
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("nombre", input.nombre);
            formData.append("precioKg", input.precioKg);
            formData.append("envase", input.envase);
            formData.append("posicionLista", input.posicionLista);
            formData.append("costo", input.costo);
            formData.append("imagen", input.imagen);//este nombre "imagen" es el q va en upload.single("imagen") en el back

            await fetch(`http://localhost:3001/productos/${_id}`, {
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
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        dispatch(getProductoById(_id));
        dispatch(getAllProds());
    },[_id, dispatch, productos]);

    useEffect(()=>{
        setInput({
            nombre: prod.nombre,
            precioKg: prod.precioKg,
            envase: prod.envase,
            costo: prod.costo,
            posicionLista: prod.posicionLista,
            imagen: prod.imagen
        })
    },[prod.costo, prod.envase, prod.imagen, prod.nombre, prod.posicionLista, prod.precioKg])
    
    useEffect(() => {
        // Actualizar lista local de productos cuando el store de Redux se actualice
        setListaProd(productos);
    }, [productos]);


    return (
        <div className='cont-modifProd-formulario'>
            <FormularioProducto
            operacion={"modifica"}
            productos={listaProd}
            handleSubmit={handleSubmit}
            input={input}
            handleChange={handleChange}
            errors={errors}
            previewSource={previewSource}
        />
        </div>
    )
}

export default FormularioModifProducto