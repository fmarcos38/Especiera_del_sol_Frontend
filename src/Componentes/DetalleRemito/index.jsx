import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Remito from '../Remito';
import { getRemitoById } from '../../Redux/Actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';

function DetalleRemito() {
    //componente que se accede desd menú opc: lista clientes --> btn remitos --> btn detalle
    const {_id} = useParams(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); 
    const cliente = useSelector(state => state.cliente); 

    // Función para guardar PDF en hoja horizontal A4
const handleSavePDF = () => {
    const input = document.getElementById('imp-remitos');
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4'); // Cambiamos la orientación a 'l' para horizontal
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('remito.pdf');
    });
};


    useEffect(() => {
        dispatch(getRemitoById(_id));
    }, [_id, dispatch]);


    return (
        <div className='cont-principal-detalleR'>
            <div id='imp-remitos' className='cont-remitos-detalleR'>            
            <Remito 
                operacion={"muestra"} 
                numUltimoRemito={remito.numRemito} 
                cliente={cliente}
                clienteExiste={true} 
                items={remito.items} 
                totPedido={remito.totPedido}
                bultos={remito.bultos} 
                transporte={remito.transporte}
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
            />
        </div>
        <div>
            <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Imprimir</button>
        </div>
        </div>
    )
}

export default DetalleRemito