import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './estilos.css';
import { getAllProds } from '../../Redux/Actions';


function FormularioProducto() {

    const [input, setInput] = useState({
        nombre: "",
        precioKg: 0,
        precioUnidad: 0,
        kgsUnidad: 0,
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
        if (!input.precioUnidad) newErrors.precioUnidad = 'Precio x unid es requerido';
        if (!input.kgsUnidad) newErrors.kgsUnidad = 'Kgs x unid es requerido';
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
                    formData.append("precioUnidad", input.precioUnidad);
                    formData.append("kgsUnidad", input.kgsUnidad);
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
                        precioUnidad: 0,
                        kgsUnidad: 0,
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
        <form className="client-form" onSubmit={handleSubmit}>
            {/* nombre y precio x kg */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Nombre del producto</label>
                    <input
                        type="text"
                        name="nombre"
                        value={input.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                    <label>Precio Kg</label>
                    <input
                        type="number"
                        name="precioKg"
                        value={input.precioKg}
                        onChange={handleChange}
                    />
                    {errors.precioKg && <span className="error">{errors.precioKg}</span>}
                </div>
            </div>
            
            {/* precio unidad y kg unidad */}
            <div className='cont-dos-items'>
                <div className="form-group">
                    <label>Precio Unidad</label>
                    <input
                        type="number"
                        name="precioUnidad"
                        value={input.precioUnidad}
                        onChange={handleChange}
                    />
                    {errors.precioUnidad && <span className="error">{errors.precioUnidad}</span>}
                </div>
                <div className="form-group">
                    <label>Kgs x Unidad</label>
                    <input
                        type="number"
                        name="kgsUnidad"
                        value={input.kgsUnidad}
                        onChange={handleChange}
                    />
                    {errors.kgsUnidad && <span className="error">{errors.kgsUnidad}</span>}
                </div>
            </div>
            
            {/* imagen prod */}
            <div className="cont-img-vistaPrevia">
                {/* foto */}
                <div className="cont-imagen-prod">
                    <label className="label-img">Seleccione una imágen para el produto:</label>
                    <input className="input-carga-img" name='imagen' type="file" accept="imagen/*" onChange={handleChange} />
                    {errors.imagen && <span className="error">{errors.imagen}</span>}
                </div>

                {/* muestra foto */}
                <div>
                    <img src={previewSource} alt="Sin cargar" className="imagen-prod" />
                </div>
            </div>

            {/* botón */}
            <div className='cont-btn-enviar-formCliente'>
                <button type="submit" className='btn-enviar-form-cliente'>Enviar</button>
            </div>
        </form>
    )
}

export default FormularioProducto