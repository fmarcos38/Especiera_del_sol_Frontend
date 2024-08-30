import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import WhatsAppButton from '../BotonWhastApp';
import ListaPrecios from '../ListaPrecios';


function ListaDePrecios() {
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('lista-precios');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('lista.pdf'); //nombre del archivo q se baja
        });
    };

    useEffect(() => {
        dispatch(getAllProds())
    }, [dispatch]);

    return (
        <div className='cont-padre-lista-precios'>
            <ListaPrecios productos={productos} lista={"pricipal"}/>
            {/* botón imprimir */}
            <button onClick={handleSavePDF} className='boton-imprimir'>Descargar</button>
            {/* Botón WhatsApp */}
            <WhatsAppButton />
        </div>
    )
}

export default ListaDePrecios