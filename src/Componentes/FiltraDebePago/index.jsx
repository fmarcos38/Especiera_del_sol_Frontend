import React from 'react';
import './estilos.css';
function FiltraDebePago({ operacion, handleOnClick }) {


    return (
        <div className='cont-btns-debePago-fechaMas-ffechaMenos'>
            {/* botnes estado */}
            <div className='cont-btns-debe-pagado'>
                <button 
                    id='debe' 
                    onClick={(e) => { handleOnClick(e) }} 
                    className='btn-filtros'
                >
                    {
                        operacion === 'venta' ? "Debe" : "Compra"
                    }
                </button>
                <button 
                    id='pagado' 
                    onClick={(e) => { handleOnClick(e) }} 
                    className='btn-filtros'
                >
                    {
                        operacion === "venta" ? "Pagado" : "Anticipo" 
                    }
                </button>
                <button 
                    id='todos' 
                    onClick={(e) => { handleOnClick(e) }} 
                    className='btn-filtros'
                >
                    Ambos
                </button>
            </div>
            {/* btns y fecha Max Min */}
            <div className='cont-btns-fecha-max-min'>
                <button id='fechaMax' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬆</button>
                <button id='fechaMin' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬇</button>
            </div>
        </div>
    )
}

export default FiltraDebePago