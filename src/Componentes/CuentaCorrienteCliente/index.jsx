import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { buscaClientePorCuit, getRemitosCliente, } from '../../Redux/Actions';
import ListaCuentaCorrienteCliente from '../ListaCuentaCorrienteCliente';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import './estilos.css';

function CuentaCorrienteCliente() {

    const {cuit} = useParams();
    //estado para filtrar remitos por fecha
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const cliente = useSelector(state => state.cliente);
    const remitos = useSelector(state => state.remitos);    
    const dispatch = useDispatch();

    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };

    //efecto para buscar cliente por cuit y sus remitos
    useEffect(() => {
        const cuitNumber = Number(cuit); console.log("cuit:",cuitNumber);
        dispatch(buscaClientePorCuit(cuitNumber));
        dispatch(getRemitosCliente(cuitNumber, "todos", fechaDesde, fechaHasta));
    }, [cuit, dispatch, fechaDesde, fechaHasta ]);


    //funcion imprimir tabla
    const handlePrint = () => {
        const printContents = document.getElementById('tablaCCC').outerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className='cont-cuentaCC'>
            {/* filtros */}
            <div className="cont-filtros-lista-remitos-cliente">                                    
                    <FiltrosComprasVentasFecha
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                    />
                
                    {/* <BotonResetFiltros handleOnClick={handleOnClick} /> */}
                
                <h2 className='mensj-mes-actual'>Si no se filtra por Fecha, muestra el mes Actual !!</h2>
            </div>
            
            <div className='cont-titulo-lista-boton'>
                <h1>Cuenta Corriente Cliente: {cliente.nombreApellido}</h1>
                {/* lista movimientos */}
                <div id='tablaCCC'>
                    <ListaCuentaCorrienteCliente data={remitos} />
                </div>
                {/* boton imprimir tabla */}
                <button onClick={() => handlePrint()} className='btn-imprimir'>Imprimir</button>
            </div>
            
        </div>
    )
}

export default CuentaCorrienteCliente