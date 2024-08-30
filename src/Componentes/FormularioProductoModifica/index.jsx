import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds, getProductoById, modifProd } from '../../Redux/Actions';
import FormularioProducto from '../FormularioProducto';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './estilos.css';

function FormularioModifProducto() {
    const { _id } = useParams();
    const prod = useSelector(state => state.producto);
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const [previewSource, setPreviewSource] = useState('');
    const productos = useSelector(state => state.productos);
    const [listaProd, setListaProd] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

        if (value) {
            const errores = { ...errors };
            delete errores[name];
            setErrors(errores);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = dispatch(modifProd(_id, input));
            if(resp){
                Swal.fire({
                    title: "OK",
                    text: "Producto modificado con exito",
                    icon: "success"
                });
                setInput({
                    nombre: '',
                    unidadMedida: null,
                    precioKg: '',
                    precioKgContado: '',
                    costo: '',
                    envase: '',
                    envaseEspecial: '',
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
    };

    useEffect(() => {
        dispatch(getProductoById(_id));
        dispatch(getAllProds());
    }, [_id, dispatch]);

    useEffect(() => {
        if (prod) {
            setInput({
                nombre: prod.nombre,
                unidadMedida: prod.unidadMedida,
                precioKg: prod.precioKg,
                envase: prod.envase,
                costo: prod.costo,
                posicionLista: prod.posicionLista,
                precioKgContado: prod.precioKgContado,
                envaseEspecial: prod.envaseEspecial,
            });
            setPreviewSource('');
        }
    }, [prod]);

    useEffect(() => {
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
    );
}

export default FormularioModifProducto;
