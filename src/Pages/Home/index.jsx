import React, {useContext, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllClientes, getAllProds } from '../../Redux/Actions';
import BotonWhatsApp from '../../Componentes/BotonWhastApp';
import { AppContexto } from '../../Contexto';
import './estilos.css';


function Home() {

    const dispatch = useDispatch();
    const contexto = useContext(AppContexto);

    useEffect(() => {
        dispatch(getAllClientes());
        dispatch(getAllProds());
    }, [dispatch]);


    return (
        <div className='cont-home'>
            <div className='cont-msj-home'>
                <h1 className='texto-home'>Bienvenidos a Especiera del Sol</h1>
                <h2 className='texto-home'>Especias + Frutas Secas</h2>
            </div>
            {
                !contexto.isAuthenticated && 
                <div className='whatsapp-button '>
                    <BotonWhatsApp />
                </div>
            }
        </div>
    )
}

export default Home