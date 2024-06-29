import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto'
import FormularioProveedorModif from '../FormularioProveedorModif';

function ModalEdicionProveedor({provAeditar, setProvAeditar}) {

    const contexto = useContext(AppContexto);

    return (
        <div className='cont-modal-Cliente'>
            <button 
                onClick={() => {contexto.setModalProveedorOpen(false)}}
                className='btn-cerrar-modal-cliente'
            >
                X
            </button>
            <FormularioProveedorModif provAeditar={provAeditar} setProvAeditar={setProvAeditar}/>
        </div>
    )
}

export default ModalEdicionProveedor