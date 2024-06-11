import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { eliminaCliente } from '../../Redux/Actions';
import './estilos.css';

function BotonEliminarCliente({_id}) {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(eliminaCliente(_id));
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

export default BotonEliminarCliente