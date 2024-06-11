import React, { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto'
import './estilos.css';

function BotonEditaCliente({_id}) {

    const contexto = useContext(AppContexto);

    return (        
        <button 
            className='btn-edita-cliente'
            onClick={() => {contexto.setModalClienteOpen(true)}}
        >
            <EditIcon />
        </button>        
    )
}

export default BotonEditaCliente;