import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto'
import './estilos.css';
import FormModificaCliente from '../FormularioModifCliente';

function ModalEdicionCliente({c}) {

    const contexto = useContext(AppContexto);
    

    return (
        <div className='cont-modal-Cliente'>
            <button 
                onClick={() => {contexto.setModalClienteOpen(false)}}
                className='btn-cerrar-modal-cliente'
            >
                X
            </button>
            <FormModificaCliente c={c}/>
        </div>
    )
}

export default ModalEdicionCliente