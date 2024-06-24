import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto';


function ModalRemito() {


    const contexto = useContext(AppContexto);

    const handleClick = () => {
        contexto.setModalRemito(false);
    };


    return (
        <div>
            ModalRemito
            <button onClick={() => {handleClick()}}>X</button>
        </div>
    )
}

export default ModalRemito