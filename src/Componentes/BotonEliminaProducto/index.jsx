import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { eliminaProducto, getAllProds } from '../../Redux/Actions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './estilos.css';

function BotonEliminaProducto({_id, nombre}) {

    const dispatch = useDispatch();

    const handleClick = () => {
        Swal.fire({
            title: "Estás segur@ ?",
            text: `De eliminar a ${nombre} !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                dispatch(eliminaProducto(_id));
                dispatch(getAllProds());
                window.location.reload();
            }
        });
    };

    return (
        <button onClick={() => {handleClick()}} className='btn-elimina-producto'>
            <DeleteForeverIcon />
        </button>
    )
}

export default BotonEliminaProducto