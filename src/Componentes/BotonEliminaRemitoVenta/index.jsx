import React from 'react'
import { useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import { eliminaRemitoVentas } from '../../Redux/Actions';


function BotonEliminaRemitoVenta({_id}) {

    const dispatch = useDispatch();

    const handleElimina = () => {
        Swal.fire({
            title: "Seguro de eliminar",
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
                dispatch(eliminaRemitoVentas(_id));
                window.location.reload();
            }
        });
    };


    return (
        <button onClick={() => { handleElimina() }}>
            <DeleteForeverIcon />
        </button>
    )
}

export default BotonEliminaRemitoVenta