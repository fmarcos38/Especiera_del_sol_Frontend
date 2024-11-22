import React from 'react';
import './estilos.css';


function FiltraDebePago({ operacion, handleOnClick }) {


    return (
        <div className='cont-btns-debePago-fechaMas-ffechaMenos'>
            {/* fecha Max Min */}
            <div className='cont-btns-fecha-max-min'>
                <p className='p-titulo-ordena-fechas'>Ordena por fecha</p>
                <button id='fechaMax' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬆</button>
                <button id='fechaMin' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬇</button>
            </div>
        </div>
    )
}

export default FiltraDebePago