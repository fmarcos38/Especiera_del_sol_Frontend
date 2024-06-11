import React, { useEffect, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto'
import { getClienteByID, resetCliente } from '../../Redux/Actions';
import ModalEdicionCliente from '../ModalEdicionCliente';
import { useDispatch } from 'react-redux';
import './estilos.css';

function BotonEditaCliente({c}) {

    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getClienteByID(c._id));

        return () => {dispatch(resetCliente());}

    },[c._id, dispatch]);


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
                    <ModalEdicionCliente c={c}/>
                </div>
            }
        </div>                
    )
}

export default BotonEditaCliente;