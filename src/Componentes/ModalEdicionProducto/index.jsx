import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto'
import './estilos.css';
import FormularioModifProducto from '../FormularioProductoModifica';


function ModalEdicionProducto({prod, setProdAmodif}) {

    const contexto = useContext(AppContexto);


    return (
        <div className='cont-modal-Cliente'>
            <button 
                onClick={() => {contexto.setModalProductoOpen(false)}}
                className='btn-cerrar-modal-cliente'
            >
                X
            </button>
            <FormularioModifProducto prod={prod} setProdAmodif={setProdAmodif}/>
        </div>
    )
}

export default ModalEdicionProducto