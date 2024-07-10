import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRemitos } from '../../Redux/Actions';
import TablaVentas from '../TablaVentas';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import './estilos.css';




function ListaRemitosVentas() {

    const ventas = useSelector(state => state.remitosVentas); 
    const [estado, setEstado] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRemitos(estado));
    }, [dispatch, estado]);


    return (
        <div className='cont-lista-remitos-ventass'>
            <h1>Lista de Ventas</h1>
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha />
                    <FiltraDebePago />
                </div>
                <BotonResetFiltros />
            </div>
            <TablaVentas ventas={ventas} />
        </div>
    )
}

export default ListaRemitosVentas