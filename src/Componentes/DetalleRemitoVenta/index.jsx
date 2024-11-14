import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { buscaClientePorCuit, getRemitoById } from '../../Redux/Actions';
import Remito from '../Remito';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';

function DetalleRemitoVenta() {
    const { _id } = useParams(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); 
    const cliente = useSelector(state => state.cliente); 

    // Función para guardar PDF solo del remito 1
    const handleSavePDF = () => {
        const input = document.getElementById('remito');
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
                pdf.save('remito.pdf');
            })
            .catch((error) => {
                console.error("Error al generar el PDF:", error);
            });
    };
    // Función para guardar PDF en hoja horizontal A4
    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        dispatch(getRemitoById(_id));
    }, [_id, dispatch]);

    useEffect(() => {
        if (remito && remito.cuit) {
            dispatch(buscaClientePorCuit(remito.cuit));
        }
    }, [remito, dispatch]);

    return (
        <div className='cont-principal-detalleRVenta'>
            <div id='imp-remitos' className='cont-remitos-detalleRVenta'>
                <Remito
                    id='remito'
                    operacion={"muestra"}
                    cliente={cliente}
                    clienteExiste={true}
                    numUltimoRemito={remito.numRemito}
                    items={remito.items}
                    totPedido={remito.totPedido}
                    bultos={remito.bultos}
                    transporte={remito.transporte}
                    fecha={remito.fecha}
                />
                {/* 2do remito */}
                <Remito
                    operacion={"muestra"}
                    numUltimoRemito={remito.numRemito}
                    cliente={cliente}
                    clienteExiste={true}
                    items={remito.items}
                    totPedido={remito.totPedido}
                    bultos={remito.bultos}
                    transporte={remito.transporte}
                    fecha={remito.fecha}
                />
            </div>
            <div>
                <button type='button' onClick={handlePrint} className='boton-imprimir'>Imprimir</button>
                <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Guardar en PDF</button>
            </div>
        </div>
    );
}

export default DetalleRemitoVenta;
