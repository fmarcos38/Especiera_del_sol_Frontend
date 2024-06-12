import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';

function BotonEditaCliente({c, setClienteAeditar}) {

    
    return (  
        <div>
            <button 
                className='btn-edita-cliente'              
            >
                <EditIcon />
            </button>

        </div>                
    )
}

export default BotonEditaCliente;