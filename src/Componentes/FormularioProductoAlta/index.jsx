import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creaProducto, getAllProds } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';
import Swal from 'sweetalert2';
import './estilos.css';
import { useNavigate } from 'react-router-dom';


function FormularioProductoAlta({operacion}) {

    const [input, setInput] = useState({
        nombre: "",
        unidadMedida: null,
        precioKg: "",
        costo: "",
        envase: "",
        posicionLista: ""
    }); //estado inical inputs 
    const [errors, setErrors] = useState({}); //manejo de errore
    const [listaProd, setListaProd] = useState([]); //estado para actualizar la lista de productos al agregar uno
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //funcion verifica si ya existe el producto
    const existeProducto = () => {
        let existeProd = {};
        existeProd = productos.find(p => p.nombre === input.nombre);
        if(existeProd){ return existeProd; }
        return existeProd = {nombre: ""};
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'unidadMedida'){
            setInput({...input, unidadMedida: e.target.value});
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
        if (!input.unidadMedida) newErrors.unidadMedida = 'Unidad medida requerido';
        if (!input.precioKg) newErrors.precioKg = 'Precio x Kg es requerido';
        if (!input.costo) newErrors.costo = 'Costo es requerido';
        if (!input.envase) newErrors.envase = 'Envase es requerido';
        if (!input.posicionLista) newErrors.posicionLista = 'Posición requerido';
        if (!input.posicionLista) newErrors.imagen = 'La posición es requerida';
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async(e) => {
        e.preventDefault(); console.log("entré")
        let prod = existeProducto(); 
        if(prod.nombre === ""){
            if (validate()) {
                try {
                    const resp = dispatch(creaProducto(input));
                    if(resp){
                        Swal.fire({
                            title: "OK",
                            text: "Producto creado con exito",
                            icon: "success"
                        });
                        setInput({
                            nombre: '',
                            unidadMedida: null,
                            precioKg: '',
                            costo: '',
                            envase: '',
                            posicionLista: '',
                        });
                        dispatch(getAllProds());
                        navigate('/productos');
                    }else {
                        Swal.fire({
                            text: 'Algo salió mal!!',
                            icon: 'error'
                        });
                    }
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
        />
    )
}

export default FormularioProductoAlta;