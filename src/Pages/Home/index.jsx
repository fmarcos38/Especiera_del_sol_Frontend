import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllClientes, getAllProds } from '../../Redux/Actions';
import BotonWhatsApp from '../../Componentes/BotonWhastApp';
import './estilos.css';

function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllClientes());
        dispatch(getAllProds());
    }, [dispatch]);


    return (
        <div className='cont-home'>
            <h1>Bienvenido a Especiera del Sol</h1>
            <h2>Especias + Frutas Secas</h2>
            <BotonWhatsApp />
        </div>
    )
}

export default Home