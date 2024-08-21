import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { creaGasto, getGastosMesActual } from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';
import { AppContexto } from '../../Contexto';
import ModalModifGasto from '../ModalModifGasto';
import BotonEliminaGasto from '../BotoneliminaGasto';

function CreaGasto() {

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
    const [data, setData] = useState({descripcion: "", monto: ""});
    const [error, setError] = useState({});
    //me traigo los gastos cargados para el mes actual
    const gastosMes = useSelector(state => state.gastos);
    //estado para actualizar en tiempo real la nueva carga
    const [gastos, setGastos] = useState(gastosMes);
    //estado para obtener el id del remito y pasarselo al modal
    const [gasto, setGasto] = useState({});

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
    //cambio el estado para el modal y actualizo id
    const handleOnClickModal = (data) => {
        contexto.setModalModifGasto(true);
        setGasto(data);
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
        if(validaInputs()){
            dispatch(creaGasto(data));
            setData({descripcion: "", monto: ""});
            dispatch(getGastosMesActual(año, mes));
        }
    };


    //trae gastos del mes actual
    useEffect(()=>{        
        dispatch(getGastosMesActual(año, mes));
    },[año, dispatch,mes]);

    // Actualizar gastos cuando se actualiza el estado global
    useEffect(() => {
        setGastos(gastosMes);
    }, [gastosMes]);


    return (
        <div className='cont-gastos'>
            <h1>Crea gasto y muestra los gastos del mes actual</h1>
            <form onSubmit={(e) => {handleSub(e)}} className='cont-form-creaGasto'>
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
            {/* Tabla muestra gastos del mes registrados - para evitar repetir */}
            <div className='cont-gastos'>
                <table className='client-table'>
                    <thead>
                        <tr>
                            <th style={{width: "150px"}}>Fecha creación</th>
                            <th>Descripción</th>
                            <th style={{width: "150px"}}>Monto</th>
                            <th>Edita/Elim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gastos?.map(g => {
                                return(
                                    <tr key={g._id}>
                                        <td>{fechaArg(g.fecha)}</td>
                                        <td>{g.descripcion}</td>
                                        <td>${formatMoney(g.monto)}</td>
                                        <td style={{ width: '50px' }}>
                                            <div style={{ display: 'flex' }} key={g._id}>
                                                <button onClick={(e) => handleOnClickModal(g)}>
                                                    <EditIcon />
                                                </button>
                                                <BotonEliminaGasto _id={g._id} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <td>TOTAL</td>
                        <td></td>
                        <td>${calcTotGastos()}</td>
                        <td></td>
                    </tfoot>
                </table>
            </div>
            {/* modal */}
            {
                contexto.modalModifGasto === true && (
                    <div className='cont-modal-entregaCliente'>
                        <ModalModifGasto gasto={gasto} />
                    </div>
                )
            }
        </div>
    )
}

export default CreaGasto