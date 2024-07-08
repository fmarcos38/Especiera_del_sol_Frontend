import React from 'react';
import './estilos.css';

function BotonResetFiltros({ handleOnClick }) {

    return (
        <div className='cont-btn-resetea'>
            <button id='todos' onClick={(e) => { handleOnClick(e) }} className='btn-resetea-filtros'>Resetea Filtros</button>
        </div>
    )
}

export default BotonResetFiltros