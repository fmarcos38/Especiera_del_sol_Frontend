import React from 'react';
import { formatDate, formatMoney } from '../../Helpers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';


const RemitoDeUnPagoCliente = ({ cliente, totPedido, fecha, condicion_pago }) => {

    // Función para guardar PDF solo del remito 1
    const handleSavePDF = () => {
        const input = document.getElementById('remito-pago-cliente');
        if (!input) {
            console.error("Elemento con id 'remito1' no encontrado");
            return;
        }
        html2canvas(input, { scale: 2 }) // Aumentar la escala para mejorar la calidad
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('portrait', 'mm', 'a4'); // Orientación vertical
                const imgWidth = 210; // Ancho de una hoja A4 en orientación vertical
                const pageHeight = 297; // Alto de una hoja A4 en orientación vertical
                const imgHeight = canvas.height * imgWidth / canvas.width;

                // Ajustar la imagen para que quepa en una sola página
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pageHeight ? pageHeight : imgHeight);
                pdf.save('remito-pago-cliente.pdf');
            })
            .catch((error) => {
                console.error("Error al generar el PDF:", error);
            });
    };
    // Función para guardar PDF en hoja horizontal A4
    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{'display':'flex', 'flexDirection':'column', 'justifyContent':'center', 'alignItems':'center'}}>
        <div className="remito-pago-cliente" id='remito-pago-cliente'>
            <h2>Remito de Pago</h2>
            <p><strong>Cliente:</strong> {cliente.nombreApellido}</p>
            <p><strong>Total Pedido:</strong> ${formatMoney(totPedido)}</p>
            <p><strong>Fecha:</strong> {formatDate(fecha)}</p>
            <p><strong>CUIT:</strong> {cliente.cuit}</p>
            <p><strong>Condición de Pago:</strong> {condicion_pago}</p>
        </div>

            <button type='button' onClick={handlePrint} className='boton-imprimir'>Imprimir</button>
            <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Guardar en PDF</button>
        </div>
    );
};

export default RemitoDeUnPagoCliente;