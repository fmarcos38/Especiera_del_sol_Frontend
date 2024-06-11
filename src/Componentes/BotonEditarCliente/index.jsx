import React, { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto'
import ModalEdicionCliente from '../ModalEdicionCliente';
import './estilos.css';

function BotonEditaCliente({_id}) {

    const contexto = useContext(AppContexto);

    return (  
        <div>
            <button 
            className='btn-edita-cliente'
            onClick={() => {contexto.setModalClienteOpen(true)}}
        >
            <EditIcon />
        </button>

            {/* Modal edición cliente */}
            {
                contexto.modalClienteOpen && 
                <div className='cont-modal-lista-clientes'>
                    <ModalEdicionCliente _id={_id}/>
                </div>
            }
        </div>                
    )
}

export default BotonEditaCliente;