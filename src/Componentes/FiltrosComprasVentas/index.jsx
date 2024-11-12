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
            <form className='form-busca-por-fecha'>
            <p className='p-titulo-fecha-filtro'>Buscar por Fecha</p>
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
            </form>
        </div>
    )
}

export default FiltrosComprasVentasFecha