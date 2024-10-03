import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { creaGasto, getGastosMesActual, eliminaGasto} from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import { AppContexto } from '../../Contexto';
import EditIcon from '@mui/icons-material/Edit';
import ModalModifGasto from '../ModalModifGasto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import './estilos.css';

function CreaGasto() {

    //manejo de las fechas
    let fechaActual = new Date(); 
    // Convertir a la zona horaria UTC y al formato ISO
    let utcFecha = fechaActual.toISOString(); 
    let separofecha;
    let year;
    let month;
    fechaActual = fechaArg(utcFecha); 
    separofecha = fechaActual.split('/');
    year = separofecha[2]; 
    month = separofecha[1]; 
    //--------------------
    //estado fecha creacion remito
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState();
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

        if(!descripcion) { errors.descripcion = "Descrip es requerida" }
        if(!monto || monto === 0) { errors.monto = "Monto es requerido" }
        setError(errors);

        return Object.keys(errors).length === 0;
    };
    const handleOnChangeFechaCreacion = (e) => {
        setFechaCreacion(e.target.value);
    };
    const handleOnChangeDescripcion = (e) => {
        const {id,value } = e.target;
        setDescripcion(value);

        //quito error del input
        if(value){
            const errors = {...error};
            delete errors[id];
            setError(errors);
        }
    };
    const handleOnChangeMonto = (e) => {
        const {id,value } = e.target;
        setMonto(value);

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
            const data = {
                fecha: fechaArg(fechaCreacion),
                descripcion,
                monto,
            }
            dispatch(creaGasto(data));
            setDescripcion("");
            setMonto(0);
            dispatch(getGastosMesActual(year, month));
        }
    };
    //elimina un gasto
    const handleOnClickElimina = (_id) => {
        try {
            const resp = dispatch(eliminaGasto(_id));
            if (resp) {
                Swal.fire({
                    text: 'Eliminado con éxito!!',
                    icon: 'success'
                });
                dispatch(getGastosMesActual(year, month)); // Actualiza los gastos del mes actual
            } else {
                Swal.fire({
                    text: 'Algo salió mal!!',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error("Error al eliminar gasto:", error);
            Swal.fire({
                text: 'Algo salió mal!!',
                icon: 'error'
            });
        }
    }
    // Función para formatear la fecha a 'YYYY-MM-DD' para que se muestre en el input inicialmnt
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade 0 si es necesario
        const day = ('0' + fecha.getDate()).slice(-2); // Añade 0 si es necesario
        return `${year}-${month}-${day}`;
    };

    //inicia la fecha actual
    useEffect(()=>{        
        setFechaCreacion(obtenerFechaActual());
    },[dispatch]);

    //trae gastos del mes actual
    useEffect(()=>{        
        dispatch(getGastosMesActual(year, month));
    },[dispatch, year, month]);

    // Actualizar gastos cuando se actualiza el estado global
    useEffect(() => {
        setGastos(gastosMes);
    }, [gastosMes]);


    return (
        <div className='cont-gastos'>
            <h1>Crea gasto y muestra los gastos del mes actual</h1>
            <form onSubmit={(e) => { handleSub(e) }} className='cont-form-creaGasto'>
                <div className='cont-inputs-gasto'>
                    {/* fecha */}
                    <div className='cont-dato-gasto'>
                        <label className='label-cuit-remito'>Fecha: </label>
                        <input
                            type='date'
                            id='fechaCreacionRemito'
                            value={fechaCreacion}
                            onChange={(e) => { handleOnChangeFechaCreacion(e) }}
                            className='input-gasto-fecha'
                        />
                    </div>
                    {/* descripción gasto */}
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese descripción del gasto:</label>
                        <input
                            type='text'
                            id='descripcion'
                            value={descripcion}
                            onChange={(e) => handleOnChangeDescripcion(e)}
                            className='input-gasto-descripcion'
                        />
                        {error.descripcion && (<p className="error">{error.descripcion}</p>)}
                    </div>
                    {/* monto gasto */}
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese monto del gasto:</label>
                        <input
                            type='number'
                            id='monto'
                            value={monto}
                            min={1}
                            onChange={(e) => handleOnChangeMonto(e)}
                            className='input-gasto-monto'
                        />
                        {error.monto && (<p className="error">{error.monto}</p>)}
                    </div>

                    <button type='onSubmit' className='btn-creaGasto'>Crear gasto</button>
                </div>
            </form>

            {/* Tabla muestra gastos del mes registrados - para evitar repetir */}
            <div className='cont-tabla-gastos'>
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
                                                
                                                <button
                                                    className='btn-elim-cliente'
                                                    onClick={() => { handleOnClickElimina(g._id) }}
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
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