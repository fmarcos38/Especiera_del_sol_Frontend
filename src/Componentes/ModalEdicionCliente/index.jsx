import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto'
import './estilos.css';
import FormModificaCliente from '../FormularioModifCliente';


function ModalEdicionCliente({_id}) {

    const contexto = useContext(AppContexto);

    return (
        <div className='cont-modal-Cliente'>
            <button onClick={() => {contexto.setModalClienteOpen(false)}}>X</button>
            <FormModificaCliente _id={_id}/>
        </div>
    )
}

export default ModalEdicionCliente