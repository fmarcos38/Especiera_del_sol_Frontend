import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto'
import './estilos.css';
import FormModificaCliente from '../FormularioClienteModif';

function ModalEdicionCliente({c, setClienteAeditar}) {

    const contexto = useContext(AppContexto);


    return (
        <div className='cont-modal-Cliente'>
            <button 
                onClick={() => {contexto.setModalClienteOpen(false)}}
                className='btn-cerrar-modal-cliente'
            >
                X
            </button>
            <FormModificaCliente c={c} setClienteAeditar={setClienteAeditar}/>
        </div>
    )
}

export default ModalEdicionCliente