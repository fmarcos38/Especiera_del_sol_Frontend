import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { buscaClientePorCuit, getRemitosCliente } from '../../Redux/Actions';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';

function CuentaCorrienteCliente() {

    const { cuit } = useParams();
    //estado para filtrar remitos por fecha
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const cliente = useSelector(state => state.cliente);
    const dispatch = useDispatch();

    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);
    };

    // Función para guardar PDF solo del remito 1
    const handleSavePDF = () => {
        const input = document.getElementById('tablaCCC');
        if (!input) {
            console.error("Elemento con id 'tablaCCC' no encontrado");
            return;
        }
        html2canvas(input, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('portrait', 'mm', 'a4'); // Orientación vertical A4
                const imgWidth = 210; // Ancho de A4 en mm
                const pageHeight = 297; // Alto de A4 en mm
                const imgHeight = canvas.height * imgWidth / canvas.width;

                // Ajustar la imagen para que quepa en una sola página
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pageHeight ? pageHeight : imgHeight);
                pdf.save('tablaCCC.pdf');
            })
            .catch((error) => {
                console.error("Error al generar el PDF:", error);
            });
    };

    // Función para imprimir
    const handlePrint = () => {
        const printContents = document.getElementById('tablaCCC').outerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        //window.location.reload();
    };

    //efecto para buscar cliente por cuit y sus remitos
    useEffect(() => {
        const cuitNumber = Number(cuit);
        dispatch(buscaClientePorCuit(cuitNumber));
        dispatch(getRemitosCliente(cuitNumber, "todos", fechaDesde, fechaHasta));
    }, [cuit, dispatch, fechaDesde, fechaHasta]);

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
                <h2 className='mensj-mes-actual'>Si no se filtra por Fecha, muestra el mes Actual !!</h2>
            </div>

            <div className='cont-titulo-lista-boton'>
                <h1>Cuenta Corriente Cliente: {cliente.nombreApellido}</h1>
                {/* lista movimientos */}
                <div id='tablaCCC'>
                    {/* <ListaCuentaCorrienteCliente remitos={remitos} /> */}
                </div>
                {/* boton imprimir tabla */}
                <div>
                    <button type='button' onClick={handlePrint} className='boton-imprimir'>Imprimir</button>
                    <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Guardar en PDF</button>
                </div>
            </div>
        </div>
    );
}

export default CuentaCorrienteCliente;