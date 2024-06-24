import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto';
import './estilos.css';
import Remito from '../Remito';

function ModalRemito() {


    const contexto = useContext(AppContexto);

    const handleClick = () => {
        contexto.setModalRemito(false);
    };


    return (
        <div className='cont-modal-remitos-cliente'>
            <button onClick={() => {handleClick()}}>X</button>
            <Remito/>
        </div>
    )
}

export default ModalRemito