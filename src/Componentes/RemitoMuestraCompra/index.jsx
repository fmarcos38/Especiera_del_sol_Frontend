import React from 'react';
import { formatDate, formatMoney } from '../../Helpers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';


function RemitoMuestraCompra({ proveedor, remito }) { 

    // Función para guardar PDF solo del remito 1
    const handleSavePDF = () => {
        const input = document.getElementById('remitoProv');
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
    
                pdf.save('remitoProv.pdf');
            })
            .catch((error) => {
                console.error("Error al generar el PDF:", error);
            });
    };    
    // Función para guardar PDF en hoja horizontal A4
    const handlePrint = () => {
        window.print();
    };

    //calc tot kgs vendidos
    const caclTotKgs = () => {
        let tot = 0;
        remito?.items?.map(item => {
            return tot += Number(item.cantidad);
        });
        return tot;
    };
    //calcTotCompra
    const calcTotCompra = () => {
        let tot = 0;
        remito?.items?.map(item => {
            return tot += (item.cantidad * item.unitario);
        });
        return tot;
    };
    //función crea las filas de la tabla 8 y llena las q sean necesarias
    const renderRows = () => {
        const rows = remito?.items?.map(item => (
            <tr key={item.detalle}>
                <td>{item.cantidad}</td>
                <td>{item.detalle}</td>
                <td>${formatMoney(item.unitario)}</td>
                <td>${formatMoney(item.cantidad * item.unitario)}</td>
            </tr>
        ));

        for (let i = rows?.length; i < 8; i++) {
            rows.push(
                <tr key={`empty-${i}`}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            );
        }
        return rows;
    };


    return (
        <div className='cont-gralRemito'>
            <div className='cont-remito-proveedor' id='remitoProv'>
                {/* cont info cliente */}
                <div className='cont-remito-datos-proveedor'>
                    {/* nombre y ape */}
                    <div className='cont-remito-datos-compra'>
                        <div className='cont-remito-datos-compra-Item-Nombre'>
                            <label className='lable-remito-nombre-proveedor'>Proveedor:</label>
                            <input className='input-remito-nombre-proveedor' defaultValue={proveedor?.nombreApellido} />
                        </div>
                        <div className='cont-remito-datos-compra-Item-fecha'>
                            <p className='fecha-remito'>Fecha: {formatDate(remito?.fecha)}</p>
                        </div>
                    </div>
                    {/* domicilio */}
                    <div className='cont-remito-datos-proveedor-Item-Direccion'>
                        <label className='lable-remito-direcc-prov'>Domicilio:</label>
                        <input className='input-remito-direcc-prov' defaultValue={proveedor?.direccion} />
                    </div>
                    {/* localidad y tel */}
                    <div className='cont-remito-datos-prov-Item-Localidad-Telef'>
                        <div className='cont-localidad'>
                            <label className='lable-remito-localidad'>Localidad:</label>
                            <input className='input-remito-localidad-prov' defaultValue={proveedor?.ciudad} />
                        </div>
                        <div className='cont-telefono'>
                            <label className='lable-remito-localidad'>Tel:</label>
                            <input className='input-remito-localidad-prov' defaultValue={proveedor?.telefono} />
                        </div>
                    </div>
                    {/* cuit - iva */}
                    <div className='cont-remito-datos-prov-Item-Localidad-Telef'>
                        <div className='cont-localidad'>
                            <label className='lable-remito-localidad'>CUIT:</label>
                            <input className='input-remito-localidad-prov' defaultValue={proveedor?.cuit} />
                        </div>
                        <div className='cont-telefono'>
                            <label className='lable-remito-localidad'>IVA:</label>
                            <input className='input-remito-localidad-prov' defaultValue={proveedor?.iva} />
                        </div>
                    </div>
                    {/* cond pago y Estado */}
                    <div className='cont-remito-datos-prov-Item-Localidad-Telef'>
                        <div className='cont-localidad'>
                            <label className='lable-remito-localidad'>Cond de pago:</label>
                            <input className='input-remito-localidad-prov' defaultValue={remito?.detallePago} />
                        </div>
                        <div className='cont-telefono'>
                            <label className='lable-remito-localidad'>Estado:</label>
                            <input className='input-remito-localidad-prov' defaultValue={remito?.estado} />
                        </div>
                    </div>
                </div>

                {/* tabla items */}
                <div className='cont-remito-items'>
                    <table className='pedido-tabla'>
                        <thead>
                            <tr>
                                <th className="encabezado-cantidad-compra">Cantidad</th>
                                <th className="encabezado-detalle-compra">Detalle</th>
                                <th className="encabezado-unitario-compra">Unitario</th>
                                <th className="encabezado-importe-compra">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                            <tr>
                                <td></td>
                                <td>
                                    <div className='cont-foot-bultos'>
                                        <label style={{ marginRight: '5px' }}>Transp:</label>
                                        <p>{remito?.transporte}</p>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot className='celda-total-cifra'>
                            <tr className="total-row">
                                <td>{caclTotKgs()}</td>
                                <td className=' tfootCompras'>
                                    <div className='cont-foot-bultos'>
                                        <label style={{ marginRight: '5px', fontSize: '15px', fontWeight: '400' }}>
                                            Cant Bultos:
                                        </label>
                                        <p style={{ padding: '0', margin: '0', fontWeight: '400' }}>{remito?.bultos}</p>
                                    </div>
                                </td>
                                <td></td>
                                <td className='celda-total-cifra'>${formatMoney(calcTotCompra())}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div>
                <button type='button' onClick={handlePrint} className='boton-imprimir'>Imprimir</button>
                <button type='button' onClick={handleSavePDF} className='boton-imprimir'>Guardar en PDF</button>
            </div>
        </div>
    );
}

export default RemitoMuestraCompra;
