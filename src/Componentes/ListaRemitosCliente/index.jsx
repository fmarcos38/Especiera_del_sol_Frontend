import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRemitosCliente, buscaClientePorCuit, resetCliente, ordenaPorFechaRemitos,  } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import TablaVentas from '../TablaVentas/index.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';

function ListaRemitosCliente() {
    const { cuit } = useParams();
    const remitosCliente = useSelector((state) => state.remitos);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const dispatch = useDispatch();

    const handleOnClick = (e) => {
        // Filtrado por estado o fecha
        switch (e.target.id) {
            case 'fechaMax':
                dispatch(ordenaPorFechaRemitos("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFechaRemitos("fechaMin"));
                break;
            case 'todos':
                dispatch(getRemitosCliente(cuit, "todos", fechaDesde, fechaHasta));
                break;
            default:
                break; 
        }
    };

    const handleOnChFechaDesde = (e) => setFechaDesde(e.target.value);
    const handleOnChFechaHasta = (e) => setFechaHasta(e.target.value);

    // Función para guardar PDF solo del remito 1
    const handleSavePDF = () => {
        const input = document.getElementById('cont-segundo');
        if (!input) {
            console.error("Elemento con id 'remito' no encontrado");
            return;
        }
        html2canvas(input, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('portrait', 'mm', 'a4'); // Orientación vertical A4
                const imgWidth = 210; // Ancho de A4 en mm
                const pageHeight = 297; // Alto de A4 en mm
                const imgHeight = canvas.height * imgWidth / canvas.width;
    
                let heightLeft = imgHeight;
                let position = 0;
    
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
    
                // Si el contenido es mayor que una página, agregar más páginas
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
    
                pdf.save('cont-segundo.pdf');
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
        dispatch(getRemitosCliente(cuit, "todos", fechaDesde, fechaHasta));
    }, [cuit, dispatch, fechaDesde, fechaHasta]);

    useEffect(() => {
        dispatch(buscaClientePorCuit(cuit));
        return () => {
            dispatch(resetCliente());
        };
    }, [cuit, dispatch]);

    return (
        <div className="cont-listaRemitosCliente">
            {/* Filtros */}
            <div className="cont-filtros-lista-remitos-cliente">
                <div className='subCont-filtros-lista-remitos-cliente'>
                    <div style={{'width':'50%',}}>
                        <FiltraDebePago handleOnClick={handleOnClick} operacion={'venta'} />
                    </div>
                    <div style={{'width':'50%', display:'flex', justifyContent:'center',}}>
                        <FiltrosComprasVentasFecha
                            fechaDesde={fechaDesde}
                            handleOnChFechaDesde={handleOnChFechaDesde}
                            fechaHasta={fechaHasta}
                            handleOnChFechaHasta={handleOnChFechaHasta}
                        />
                    </div>
                </div>
                <div className='cont-btnReset-lista-remitos-cliente'>
                    <BotonResetFiltros handleOnClick={handleOnClick} />
                </div>
            </div>
            {/* Tabla */}
            {remitosCliente ? (
                <div className="cont-segundo" id='cont-segundo'>
                    <TablaVentas 
                        ventas={remitosCliente}
                        cuit={cuit} 
                        id='tablaMovCliente' 
                    />
                </div>
            ) : (
                <h1>No remitos para dicho cliente!!</h1>
            )}

            {/* Botones */}
            <div className='cont-btns-remitosCliente'>
                <button className='btn-imp-pdf-remitoCliente' onClick={handlePrint}>Imprimir</button>
                <button className='btn-imp-pdf-remitoCliente' onClick={handleSavePDF}>Generar PDF</button>
            </div>
        </div>
    );
}

export default ListaRemitosCliente;
