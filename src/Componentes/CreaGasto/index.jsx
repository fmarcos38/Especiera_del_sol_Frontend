import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGastosMesActual } from '../../Redux/Actions';
import { fechaArg } from '../../Helpers';

function CreaGasto() {

    const [data, setData] = useState({descripcion: "", monto: 0});
    const [error, setError] = useState({});
    //me traigo los gastos cargados para el mes actual
    const gastosMes = useSelector(state => state.gastos);
    const dispatch = useDispatch();

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

    };

    useEffect(()=>{
        let fechaActual = new Date(); 
        // Convertir a la zona horaria UTC y al formato ISO
        const utcFecha = fechaActual.toISOString(); console.log("utcFecha:", utcFecha)
        let separofecha;
        let año;
        let mes;
        fechaActual = fechaArg(utcFecha);        
        separofecha = fechaActual.split('-');
        año = separofecha[2];
        mes = separofecha[1];
        dispatch(getGastosMesActual(año, mes));
    },[dispatch]);


    return (
        <div>
            <form onSubmit={(e) => {handleSub(e)}}>
                <div>
                    <label>Ingrese descripción del gasto</label>
                    <input type='text' id='descripcion' value={data.descripcion} onChange={(e) => handleOnChange(e)}/>
                    {error.descripcion && (<p className="error">{error.descripcion}</p>)}
                </div>
                <div>
                    <label>Ingrese monto del gasto</label>
                    <input type='number' id='descripcion' value={data.monto} min={1} onChange={(e) => handleOnChange(e)}/>
                    {error.monto && (<p className="error">{error.monto}</p>)}
                </div>
            </form>
        </div>
    )
}

export default CreaGasto