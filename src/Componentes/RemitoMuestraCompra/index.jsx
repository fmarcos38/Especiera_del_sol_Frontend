import React from 'react';
import logoRemito from '../../Imagenes/logoYtexto.jpg';
import { formatDate, formatMoney } from '../../Helpers';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './estilos.css';


function RemitoMuestraCompra({ proveedor, remito }) { 

    //funcion para guardar PDF
    const handleSavePDF = () => {
        const input = document.getElementById('remito');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            //const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            // Ajustamos el tamaño de la imagen para que ocupe todo el alto de la hoja
            const imgHeight = pdfHeight; // Ocupa todo el alto
            const imgWidth = (canvas.width * imgHeight) / canvas.height;
    
            // Posicionamos la imagen a la izquierda
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('remito.pdf');
        });
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
                <div className='cont-remito' id='remito'>
                    {/* cont info superior */}
                    <div className='cont-remito-sup'>
                        <div className='cont-remito-sup-izq'>
                            {/* cont info empresa */}
                            <div className='cont-remito-sup-info-empresa'>                                
                                <div className='cont-info-empresa'>
                                    {/* <img src={textoLogo} alt='' className='texto-logo' /> */}
                                    <img src={logoRemito} alt='' className='logo-remito' />
                                    <p>De Gustavo Matusovsky</p>
                                    <p>11 4199 7200</p>
                                    <p>11 5951 0493</p>
                                    <p>info@especieradelsol.com</p>
                                    <p>www.especieradelsol.com</p>
                                    <p style={{ fontSize: '10px' }}>IVA RESPONSABLE INSCRIPTO</p>
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
                        {/* cont sup Derecho */}
                        <div className='cont-remito-derecho'>
                            <div className='cont-remito-derecho-SUP'>
                                <p className='derecho-SUP-titulo'>REMITO</p>
                                <p className='num-remito'>N° {remito?.numRemitoProveedor}</p>
                                <p className='fecha-remito'>Fecha: {formatDate(remito?.fecha)}</p>
                            </div>
                            <div className='cont-remito-derecho-INF'>
                                <div className='cont-remito-derecho-INF-izq'>
                                    <p className='datos-empresa-afip-IZQ'>C.U.I.T</p>
                                    <p className='datos-empresa-afip-IZQ'>Ing Brutos C.M</p>
                                    <p className='datos-empresa-afip-IZQ'>Inicio de actividades</p>
                                </div>
                                <div className='cont-remito-derecho-INF-der'>
                                    <p className='datos-empresa-afip-DER'>20-11816651-6</p>
                                    <p className='datos-empresa-afip-DER'>901-20-11816651-6</p>
                                    <p className='datos-empresa-afip-DER'>01-12-88</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cont info cliente */}
                    <div className='cont-remito-datos-cliente'>
                        {/* nombre y ape */}
                        <div className='cont-remito-datos-cliente-Item-NombreYApe'>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Nombre:</label>
                                <input className='input-remito-nombre' defaultValue={proveedor?.nombre}/>
                            </div>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Apellido:</label>
                                <input className='input-remito-nombre' defaultValue={proveedor?.apellido}/>
                            </div>
                        </div>
                        {/* domicilio */}
                        <div className='cont-remito-datos-cliente-Item-Direccion'>
                            <label className='lable-remito'>Domicilio:</label>
                            <input className='input-remito-nombre' defaultValue={proveedor?.direccion}/>
                        </div>
                        {/* localidad y tel */}
                        <div className='cont-remito-datos-cliente-Item-Localidad-Telef'>
                            <div className='cont-localidad'>
                                <label className='lable-remito'>Localidad:</label>
                                <input className='input-remito-localidad' defaultValue={proveedor?.ciudad}/>
                            </div>
                            <div className='cont-telefono'>
                                <label className='lable-remito'>Tel:</label>
                                <input className='input-remito-telefono' defaultValue={proveedor?.telefono}/>
                            </div>
                        </div>
                        {/* cuit - iva */}
                        <div className='cont-remito-datos-cliente-Item-AFIP'>
                            <div className='cont-CUIT'>
                                <label className='lable-remito'>CUIT:</label>
                                <input className='input-remito-cuit' defaultValue={proveedor?.cuit} />
                            </div>
                            <div className='cont-IVA'>
                                <label className='lable-remito'>IVA:</label>
                                <input defaultValue={proveedor?.iva} className='input-remito-iva'/>
                            </div>
                        </div>
                        {/* cond pago y Estado */}
                        <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                            <div className='cont-condicion-pago'>
                                <label className='lable-remito-condicion'>Condición de pago:</label>
                                <input defaultValue={remito?.detallePago} className='input-remito-condicionPagoo'/>
                            </div>
                            <div className='cont-estado'>
                                <label className='lable-remito-condicion'>Estado:</label>
                                <input defaultValue={remito?.estado} className='input-remito-estadoo'/>
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
                                        <label style={{ marginRight: '5px', fontSize: '15px', fontWeight:'400' }}>
                                            Cant Bultos:
                                        </label>
                                        <p style={{ padding: '0', margin: '0',fontWeight:'400' }}>{remito?.bultos}</p>
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
                <button onClick={handleSavePDF} className='boton-imprimir'>Imprimir</button>
            </div>
        </div>
    );
}

export default RemitoMuestraCompra;
