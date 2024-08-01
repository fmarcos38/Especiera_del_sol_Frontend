import React from 'react';
import './estilos.css';

function BotonResetFiltros({ handleOnClick }) {

    return (
        <div className='cont-btn-resetea'>
            <button id='mesActual' onClick={(e) => { handleOnClick(e) }} className='btn-resetea-filtros'>Mes Actual</button>
        </div>
    )
}

export default BotonResetFiltros