import React, { useContext } from 'react'
import FormCliente from '../FormularioCliente'
import { AppContexto } from '../../Contexto'

function ModalEdicionCliente({estado}) {

    const contexto = useContext(AppContexto);

    return (
        <div>
            <button onClick={() => {contexto.setModalClienteOpen(false)}}>X</button>
            <FormCliente/>
        </div>
    )
}

export default ModalEdicionCliente