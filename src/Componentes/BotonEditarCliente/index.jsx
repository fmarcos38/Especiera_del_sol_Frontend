import React, { useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto';
import ModalEdicionCliente from '../ModalEdicionCliente';
import './estilos.css';

function BotonEditaCliente({c}) {

    const [clienteAeditar, setClienteAeditar] = useState(null);
    const contexto = useContext(AppContexto);
    
    const handleEditClick = () => {
        setClienteAeditar(c);
        contexto.setModalClienteOpen(true);
    };

    return (  
        <div>
            <button 
            className='btn-edita-cliente'
            onClick={() => {handleEditClick()}}
        >
            <EditIcon />
        </button>

            {/* Modal edición cliente */}
            {
                contexto.modalClienteOpen && 
                <div className='cont-modal-lista-clientes'>
                    <ModalEdicionCliente c={clienteAeditar} setClienteAeditar={setClienteAeditar}/>
                </div>
            }
        </div>                
    )
}

export default BotonEditaCliente;