import React from 'react'
import './estilos.css';
import { useDispatch } from 'react-redux';
import { getAllRemitos } from '../../Redux/Actions';


function Filtros() {

    const dispatch = useDispatch();

    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getAllRemitos("Debe"));
                break;
                case 'pagado':
                dispatch(getAllRemitos("Pagado"));
                break;
            case 'fechaMax':
                console.log("fechaMax");
                break;
            case 'fechaMin':
                console.log("fechaMin");
                break;
            default:
                break; 
            
        }
    };
    return (
        <div className='cont-filtros'>
            <button id='debe' onClick={(e)=>{handleOnClick(e)}}>Debe</button>
            <button id='pagado' onClick={(e)=>{handleOnClick(e)}}>Pagado</button>
            <button id='fechaMax' onClick={(e)=>{handleOnClick(e)}}>Fecha ⬆️</button>
            <button id='fechaMin' onClick={(e)=>{handleOnClick(e)}}>Fecha ⬇️</button>
            <form>
                <label>Buscar por Fecha</label>
                <input type='text' />
            </form>
        </div>
    )
}

export default Filtros