import React, { useContext } from 'react'
import { AppContexto } from '../../Contexto';
import './estilos.css';
import Remito from '../Remito';
import { useSelector } from 'react-redux';

function ModalRemito() {

    const cliente = useSelector(state => state.cliente); 
    const remito = useSelector(state => state.remito);
    const contexto = useContext(AppContexto);

    const handleClick = () => {
        contexto.setModalRemito(false);
    };


    return (
        <div className='cont-modal-remitos-cliente'>
            <button onClick={() => {handleClick()}}>X</button>
            <Remito operacion={"venta"} numUltimoRemito={remito.numRemito} cliente={cliente} items={remito.items} totPedido={remito.totPedido}/>
        </div>
    )
}

export default ModalRemito