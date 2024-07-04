import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { eliminaProveedor, getAllProveedores } from '../../Redux/Actions';
import Swal from 'sweetalert2';


function BotonEliminarProveedor({_id, nombre, apellido}) {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        Swal.fire({
            title: "Estás segur@ ?",
            text: `De eliminar a ${nombre} ${apellido}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO"
        }).then((result) => {
            if(result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado!",
                    text: "Se eliminó con exito",
                    icon: "success"
                });
                dispatch(eliminaProveedor(_id));
                dispatch(getAllProveedores());
                window.location.reload();
            }
        });
    };

    return (        
        <button 
            className='btn-elim-cliente'
            onClick={() => {handleOnClick()}}
        >
            <DeleteForeverIcon />
        </button>        
    )
}

export default BotonEliminarProveedor;