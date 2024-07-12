import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGastosMesActual } from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import './estilos.css';

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
    //calc total gastos
    const calcTotGastos = () => {
        let tot = 0;
        gastosMes.map(g => {
            return tot += g.monto;
        });
        return tot;
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
        <div className='cont-gastos'>
            <h1>Crea gasto y muestra los gastos actuales</h1>
            <form onSubmit={(e) => {handleSub(e)}} className='cont-form-creaGasto'>
                <div className='cont-form-datos'>
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese descripción del gasto:</label>
                        <input type='text' id='descripcion' value={data.descripcion} onChange={(e) => handleOnChange(e)} className='input-dato-gasto-descrip' />
                        {error.descripcion && (<p className="error">{error.descripcion}</p>)}
                    </div>
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese monto del gasto:</label>
                        <input type='number' id='descripcion' value={data.monto} min={1} onChange={(e) => handleOnChange(e)} className='input-dato-gasto-monto' />
                        {error.monto && (<p className="error">{error.monto}</p>)}
                    </div>
                </div>
                <button type='onSubmit' className='btn-creaGasto'>Crear gasto</button>
            </form>
            {/* Tabla muestra gastos del mes registrados - para evitar repetir */}
            <div className='cont-gastos'>
                <table className='client-table'>
                    <thead>
                        <tr>
                            <th style={{width: "150px"}}>Fecha creación</th>
                            <th>Descripción</th>
                            <th style={{width: "150px"}}>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gastosMes?.map(g => {
                                return(
                                    <tr key={g._id}>
                                        <td>{fechaArg(g.fecha)}</td>
                                        <td>{g.descripcion}</td>
                                        <td>${formatMoney(g.monto)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <td>TOTAL</td>
                        <td></td>
                        <td>${calcTotGastos()}</td>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default CreaGasto