import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { elimnimaRemitoCompra } from '../../Redux/Actions';
import Swal from 'sweetalert2';

function BotonEliminaRemitoCompra({_id}) {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        Swal.fire({
            title: "Segur de eliminar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado!",
                    icon: "success"
                });
                dispatch(elimnimaRemitoCompra(_id));
                window.location.reload();
            }
        });
        
    };


    return (
        <button onClick={()=>{handleOnClick()}}>
            <DeleteForeverIcon sx={{ fontSize: '20px'}}/>
        </button>
    )
}

export default BotonEliminaRemitoCompra