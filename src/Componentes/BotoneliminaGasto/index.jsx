import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { eliminaGasto, getGastosMesActual } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fechaArg } from '../../Helpers';


function BotonEliminaGasto({_id}) {

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
    const dispatch = useDispatch();

    const handleOnClick = () => {
        try {
            const resp = dispatch(eliminaGasto(_id));
            if (resp) {
                Swal.fire({
                    text: 'Eliminado con éxito!!',
                    icon: 'success'
                });
                dispatch(getGastosMesActual(año, mes)); // Actualiza los gastos del mes actual
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

    return (
        <button
            className='btn-elim-cliente'
            onClick={() => { handleOnClick() }}
        >
            <DeleteForeverIcon />
        </button>
    )
}

export default BotonEliminaGasto