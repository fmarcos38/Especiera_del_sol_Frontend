import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { buscaClientePorCuit, getRemitoById } from '../../Redux/Actions';
import RemitoDeUnPagoCliente from '../RemitoDeUnPagoCliente';
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
        const input = document.getElementById('imp-remitos');
        if (!input) {
            console.error("Elemento con id 'remito' no encontrado");
            return;
        }
    
        html2canvas(input, { 
            scale: 2, 
            width: 794,   // Ancho exacto de la hoja A4 en px (96 DPI)
            height: 1123  // Alto exacto de la hoja A4 en px (96 DPI)
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Dimensiones exactas en mm
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
            {
                remito.tipoRemito === 'Venta' ? (
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
                    </div>
                ) : (
                    <div id='imp-remitos' className='cont-remitos-detalleRVenta'>
                        <RemitoDeUnPagoCliente 
                            cliente={cliente}
                            totPedido={remito.totPedido} 
                            fecha={remito.fecha} 
                            condicion_pago={remito.condicion_pago}
                        />
                    </div>
                )
            }
            <div>
                <button type='button' onClick={handlePrint} className='boton-imprimir'>Imprimir</button>
                <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Guardar en PDF</button>
            </div>
        </div>
    );
}

export default DetalleRemitoVenta;
