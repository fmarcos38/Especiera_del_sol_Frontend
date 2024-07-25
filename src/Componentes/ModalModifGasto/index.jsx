import React, { useContext, useState } from 'react';
import { AppContexto } from '../../Contexto';
import { useDispatch } from 'react-redux';
import './estilos.css';
import { modifGasto, getGastosMesActual } from '../../Redux/Actions';
import { fechaArg } from '../../Helpers';
import Swal from 'sweetalert2';


function ModalModifGasto({gasto}) {

    //manejo de las fechas
    let fechaActual = new Date(); 
        // Convertir a la zona horaria UTC y al formato ISO
        let utcFecha = fechaActual.toISOString(); 
        let separofecha;
        let año;
        let mes;
        fechaActual = fechaArg(utcFecha);        
        separofecha = fechaActual.split('-');
        año = separofecha[2];
        mes = separofecha[1];
    //--------------------
    const [data, setData] = useState({
        descripcion: gasto.descripcion,
        monto: gasto.monto
    }); 
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const contexto = useContext(AppContexto);

    const validaInputs = () => {
        const errors = {};

        if(!data.descripcion) { errors.descripcion = "Descrip es requerida" }
        if(!data.monto || data.monto === 0) { errors.monto = "Monto es requerido" }
        setError(errors);

        return Object.keys(errors).length === 0;
    };
    const handleOnChange = (e) => {
        const {id,value } = e.target;
        setData({...data, [id]: value});

        //quito error del input
        if(value){
            const errors = {...error};
            delete errors[id];
            setError(errors);
        }
    };
    const handleSub = (e) => {
        e.preventDefault();
        if(validaInputs()){
            try {
                const resp = dispatch(modifGasto(gasto._id, data));
                if (resp) {
                    Swal.fire({
                        text: 'Modificado con éxito!!',
                        icon: 'success'
                    });
                    dispatch(getGastosMesActual(año, mes));
                    contexto.setModalModifGasto(false);
                } else {
                    Swal.fire({
                        text: 'Algo salió mal!!',
                        icon: 'error'
                    });
                }
            } catch (error) {
                console.error("Error al modificar el gasto:", error);
                Swal.fire({
                    text: 'Algo salió mal!!',
                    icon: 'error'
                });
            }
        }
    };


    return (
        <div className="modal-content">
            <button
                onClick={() => { contexto.setModalModifGasto(false) }}
                className='btn-cerrar-modal-entrega'
            >
                X
            </button>
            <h1>Crea gasto y muestra los gastos actuales</h1>
            <form onSubmit={(e) => { handleSub(e) }} className='cont-form-creaGasto'>
                <div className='cont-form-datos'>
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese descripción del gasto:</label>
                        <input type='text' id='descripcion' value={data.descripcion} onChange={(e) => handleOnChange(e)} className='input-dato-gasto-descrip' />
                        {error.descripcion && (<p className="error">{error.descripcion}</p>)}
                    </div>
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese monto del gasto:</label>
                        <input type='number' id='monto' value={data.monto} min={1} onChange={(e) => handleOnChange(e)} className='input-dato-gasto-monto' />
                        {error.monto && (<p className="error">{error.monto}</p>)}
                    </div>
                </div>
                <button type='onSubmit' className='btn-creaGasto'>Crear gasto</button>
            </form>
        </div>
    )
}

export default ModalModifGasto;