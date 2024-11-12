import React from 'react';
import './estilos.css';
function FiltraDebePago({ operacion, handleOnClick }) {


    return (
        <div className='cont-btns-debePago-fechaMas-ffechaMenos'>
            {/* botnes estado */}
            <div className='cont-btns-debe-pagado'>
                <p className='p-titulo-filtros-estado'>Filtrar por estado</p>
                <button 
                    id='debe' 
                    onClick={(e) => { handleOnClick(e) }} 
                    className='btn-filtros'
                >
                    {
                        operacion === 'venta' ? "Debe" : "Compras"
                    }
                </button>
                <button 
                    id='pagado' 
                    onClick={(e) => { handleOnClick(e) }} 
                    className='btn-filtros'
                >
                    {
                        operacion === "venta" ? "Pagado" : "Pagos" 
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
            <p className='p-titulo-ordena-fechas'>Ordena por fecha</p>
                <button id='fechaMax' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬆</button>
                <button id='fechaMin' onClick={(e) => { handleOnClick(e) }} className='btn-filtros'>Fecha ⬇</button>
            </div>
        </div>
    )
}

export default FiltraDebePago