import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoRemito from '../../Imagenes/logo.png';
import textoLogo from '../../Imagenes/texto-logo.png';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { creaRemito } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import { formatDate } from '../../Helpers';


function Remito({operacion, numUltimoRemito, cliente, items, totPedido}) { 

    let nuevoNumeroRemito = 0; 
    let fechaActual = Date(); 
    //asigno valor a num remito si es el primero en generse SINO suma 1
    if( operacion === "venta" && !numUltimoRemito.ultimoRemito){
        nuevoNumeroRemito = 1;
    }else if(operacion === "venta") {
        nuevoNumeroRemito = numUltimoRemito.ultimoRemito +1;
    }else if(operacion === "muestra") {
        nuevoNumeroRemito = numUltimoRemito ;
    }
    
    //estado para cond venta y estado
    const [data, setData] = useState({        
        condicion_pago: "",
        estado: "",
    }); 
    //me traigo el remito a mostrar - Para la funcionalidad de mostrar un remito
    const remitoAmostrar = useSelector(state => state.remito); 
    const dispatch = useDispatch();

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('remito');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('remito.pdf');
        });
    };

    const handleOnChange = (e) => {
        if(e.target.id === 'estado'){
            setData({...data, estado: e.target.value});
        }else{
            setData({...data, [e.target.id]: e.target.value});
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!data.condicion_pago || !data.estado){
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cond.venta y Estado",
                icon: 'error'
            });
        }else{
            let fecha = new Date();             
            const dataBack = {
                numRemito: nuevoNumeroRemito,
                items,
                fecha: fecha,
                totPedido,
                cuit: cliente.cuit,
                cliente: cliente.nombre+" "+cliente.apellido,
                condicion_pago: data.condicion_pago,
                estado: data.estado,
            }
            dispatch(creaRemito(dataBack));
            setData({        
                condicion_pago: "",
                estado: "",
            });
            window.location.reload();
        }
        
    };
    const resetInputs = () => {
        window.location.reload();
    };
    
    return (
        <div className='cont-gralRemito'>
            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-remito'>
                <div className='cont-remito' id='remito'>
                    {/* cont info superior */}
                    <div className='cont-remito-sup'>
                        <div className='cont-remito-sup-izq'>
                            {/* cont info empresa */}
                            <div className='cont-remito-sup-info-empresa'>
                                {/* cont logo */}
                                <div className='cont-remito-sup-logo'>
                                    <img src={logoRemito} alt='' className='logo-remito' />
                                </div>
                                <div className='cont-info-empresa'>
                                    <img src={textoLogo} alt='' className='texto-logo' />
                                    <p>De Gustavo Matusovsky</p>
                                    <p>11 4199 7200</p>
                                    <p>11 5951 0493</p>
                                    <p>info@especieradelsol.com</p>
                                    <p>www.especieradelsol.com</p>
                                    <p style={{fontSize: '10px'}}>IVA RESPONSABLE INSCRIPTO</p>
                                </div>                                
                            </div>
                            {/* cont X */}
                            <div className='cont-remito-sup-info-X'>
                                <div className='cont-letra-x'>
                                    <p className='letra-x'>X</p>
                                </div>
                                <div className='cont-doc-no-valido'>
                                    <p className='p-cont-X'>Documento</p>
                                    <p className='p-cont-X'>No Válido</p>
                                    <p className='p-cont-X'>como</p>
                                    <p className='p-cont-X'>Factura</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cont info cliente */}


                    {/* cont info items */}

                </div>                
            </form>
            
        </div>
    )
}

export default Remito;



