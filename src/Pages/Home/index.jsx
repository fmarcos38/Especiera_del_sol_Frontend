import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllClientes, getAllProds } from '../../Redux/Actions';


function Home() {

    const dispatch = useDispatch();

    /* useEffect(() => {
        dispatch(getAllClientes());
        dispatch(getAllProds());
    }, [dispatch]); */


    return (
        <div className='cont-home'>Bienvenido a Especiera del Sol</div>
    )
}

export default Home