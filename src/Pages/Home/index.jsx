import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllClientes } from '../../Redux/Actions';


function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllClientes());
    }, [dispatch]);


    return (
        <div className='cont-home'>Bienvenido a Especiera del Sol</div>
    )
}

export default Home