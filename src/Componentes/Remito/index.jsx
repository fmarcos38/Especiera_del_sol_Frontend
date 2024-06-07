import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoRemito from '../../Imagenes/logo.png';
import './estilos.css';

function Remito() {

    //estado arreglo pedido
    const [pedido, setPedido] = useState([]);
    //estado item
    const [item1, setItem1] = useState({cantidad: "", detalle: "", unitario: "", importe: ""});
    const [item2, setItem2] = useState({cantidad: "", detalle: "", unitario: "", importe: ""});

    /* funcion para OnChange de c/input */
    const handleOnChange = (e) => {
        
    };

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('pdf-content');
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

    return (
        <div className='cont-gralRemito'>
            <div className='cont-remito' id='pdf-content'>
                {/* cont info superior */}
                <div className='cont-remito-sup'>
                    <div className='cont-remito-sup-izq'>                        
                        {/* cont info empresa */}
                        <div className='cont-remito-sup-info-empresa'>
                            {/* cont logo */}
                            <div className='cont-remito-sup-logo'>
                                <img src={logoRemito} alt='' className='logo-remito'/>
                                <h1>ESPECIERA DEL SOL</h1>
                            </div>                            
                            <p>ESPECIAS - FRUTAS SECAS</p>
                            <p>11 4199 7200</p>
                            <p>11 5951 0493</p>
                            <p>info@especieradelsol.com</p>
                            <p>www.especieradelsol</p>
                            <p>IVA RESPONSABLE INSCRIPTO</p>
                        </div>
                        {/* cont X */}
                        <div className='cont-remito-sup-info-X'>
                            <h2 className='letra-X'>X</h2>
                            <p className='p-cont-X'>Documento</p>
                            <p className='p-cont-X'>No Válido</p>
                            <p className='p-cont-X'>como</p>
                            <p className='p-cont-X'>Factura</p>
                        </div>
                    </div>
                    
                    {/* cont sup Derecho */}
                    <div className='cont-remito-derecho'>
                        <div className='cont-remito-derecho-SUP'>
                            <h2 className='cont-remito-derecho-SUP-titulo'>REMITO</h2>
                            <p className='num-remito'>N° 0001</p>
                            <p className='fecha-remito'>Fecha: {new Date().toLocaleDateString()}</p>
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
                    <div className='cont-remito-datos-cliente-Item-Nombre'>
                        <label className='lable-remito'>Señor(es):</label>
                        <input className='input-remito-nombre' />
                    </div>
                    <div className='cont-remito-datos-cliente-Item-Direccion'>
                        <label className='lable-remito'>Domicilio:</label>
                        <input className='input-remito-domicilio' />
                    </div>
                    <div className='cont-remito-datos-cliente-Item-Localidad-Telef'>
                        <div className='cont-localidad'>
                            <label className='lable-remito'>Localidad:</label>
                            <input className='input-remito-localidad' />
                        </div>
                        <div className='cont-telefono'>
                            <label className='lable-remito'>Tel:</label>
                            <input className='input-remito-telefono' />
                        </div>
                    </div>
                    <div className='cont-remito-datos-cliente-Item-AFIP'>
                        <div className='cont-IVA'>
                            <label className='lable-remito'>IVA:</label>
                            <input className='input-remito-iva' />
                        </div>
                        <div className='cont-CUIT'>
                            <label className='lable-remito'>CUIT:</label>
                            <input className='input-remito-cuit' />
                        </div>
                    </div>
                    <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                        <label className='lable-remito-condicion'>Condición de pago:</label>
                        <input className='input-remito-condicionPago'/>
                    </div>
                </div>

                {/* cont info items */}
                <div className='cont-remito-items'>
                    <table className='pedido-tabla'>
                        <thead>
                            <tr>
                                <th className="encabezado-cantidad">Cantidad</th>
                                <th className="encabezado-detalle">Detalle</th>
                                <th className="encabezado-unitario">P. Unitario</th>
                                <th className="encabezado-importe">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type='text' id='item-1-cantidad' value={item1.cantidad} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad'/>
                                </td>
                                <td>
                                    <input type='text' id='item-1-detalle' value={item1.detalle} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad'/>
                                </td>
                                <td>
                                    <input type='text' id='item-1-unitario' value={item1.unitario} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad'/>
                                </td>
                                <td>
                                    <input type='text' id='item-1-importe' value={item1.importe} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad'/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='text' id='item-2-cantidad' value={item2.cantidad} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad' />
                                </td>
                                <td>
                                    <input type='text' id='item-2-detalle' value={item2.detalle} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad' />
                                </td>
                                <td>
                                    <input type='text' id='item-2-unitario' value={item2.unitario} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad' />
                                </td>
                                <td>
                                    <input type='text' id='item-2-importe' value={item2.importe} onChange={(e) => handleOnChange(e)} className='input-item-1-cantidad' />
                                </td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            {/*<tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>almendras</td>
                                <td>10000</td>
                                <td>100000</td>
                            </tr> */}
                        </tbody>
                        <tfoot className='celda-total-cifra'>
                            <tr className="total-row">
                                <td className='pie-tabla-palabra' colSpan="3">TOTAL</td>
                                <td className='celda-total-cifra'>100000</td>
                            </tr>
                        </tfoot>    
                    </table>
                </div>
            </div>

            {/* botón imprimir */}
            <button onClick={handleSavePDF} className='boton-imprimir'>Guardar como PDF</button>
        </div>
    )
}

export default Remito;


/*

<tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.cantidad}</td>
            <td>{item.detalle}</td>
            <td>{item.pUnitario.toFixed(2)}</td>
            <td>{(item.cantidad * item.pUnitario).toFixed(2)}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td colSpan="3">TOTAL</td>
          <td>{total.toFixed(2)}</td>
        </tr>
      </tbody>

*/