import React from 'react';
import './estilos.css';

function FiltrosComprasVentasFecha({ 
    handleOnSubFechas, 
    fechaDesde, 
    handleOnChFechaDesde,
    fechaHasta,
    handleOnChFechaHasta,
    handleOnClick,
}) {


    return (
        <div className='cont-filtros-fecha'>
            <p className='p-titulo-fecha-filtro'>Buscar por Fecha</p>
            <form onSubmit={(e) => handleOnSubFechas(e)}>
                <div>
                    <label className='lable-fecha-filtro'>Desde</label>
                    <input 
                        type='date' 
                        id='fechaDesde' 
                        value={fechaDesde} 
                        onChange={(e) => handleOnChFechaDesde(e)} 
                        className='input-fecha-filtro' 
                    />
                    <label className='lable-fecha-filtro'>Hasta</label>
                    <input 
                        type='date' 
                        id='fechaHasta' 
                        value={fechaHasta} 
                        onChange={(e) => handleOnChFechaHasta(e)} 
                        className='input-fecha-filtro' 
                    />
                </div>
                <div className='cont-btn-aplicar-fechas'>
                    {/* <button type='submit' className='btn-aplicar-fechas'>Aplicar fechas</button> */}
                    {/* <button 
                        type='button' 
                        id='borraFechas'
                        onClick={(e) => { handleOnClick(e) }}
                        className='btn-aplicar-fechas'
                    >
                        Borra fechas
                    </button> */}
                </div>
            </form>
        </div>
    )
}

export default FiltrosComprasVentasFecha