import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoRemito from '../../Imagenes/logo.png';
import './estilos.css';
import { useDispatch } from 'react-redux';
import { modificaRemito } from '../../Redux/Actions';
import Swal from 'sweetalert2';


function RemitoModifica({ cliente, remito}) { 

    //estado para cond venta y estado
    const [data, setData] = useState({        
        condicion_pago: remito.condicion_pago,
        estado: remito.estado,
    }); 
    const dispatch = useDispatch();

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
        } else {
            const dataBack = {
                numRemito: remito.numRemito,
                items: remito.items,
                totPedido: remito.totPedido,
                cuit: cliente.cuit,
                condicion_pago: data.condicion_pago,
                estado: data.estado,
            }
            dispatch(modificaRemito(remito._id, dataBack));
            Swal.fire({
                title: "Se modificó con exito!!",
                icon: "success"
            });
        }        
    };

    return (
        <div className='cont-gralRemito'>
            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-remito'>
                <div className='cont-remito' id='pdf-content'>
                    {/* cont info superior */}
                    <div className='cont-remito-sup'>
                        <div className='cont-remito-sup-izq'>
                            {/* cont info empresa */}
                            <div className='cont-remito-sup-info-empresa'>
                                {/* cont logo */}
                                <div className='cont-remito-sup-logo'>
                                    <img src={logoRemito} alt='' className='logo-remito' />
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
                                <p className='num-remito'>N° {remito.numRemito}</p>
                                <p className='fecha-remito'>Fecha: {data.fecha_compra}</p>
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
                        <div className='cont-remito-datos-cliente-Item-NombreYApe'>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Nombre:</label>
                                <input
                                    type='text'
                                    value={cliente?.nombre}
                                    className='input-remito-nombre' />
                            </div>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Apellido:</label>
                                <input
                                    type='text'
                                    value={cliente?.apellido}
                                    className='input-remito-nombre'
                                />
                            </div>
                        </div>
                        <div className='cont-remito-datos-cliente-Item-Direccion'>
                            <label className='lable-remito'>Domicilio:</label>
                            <input
                                type='text'
                                value={cliente?.direccion}
                                className='input-remito-nombre'
                            />
                        </div>
                        <div className='cont-remito-datos-cliente-Item-Localidad-Telef'>
                            <div className='cont-localidad'>
                                <label className='lable-remito'>Localidad:</label>
                                <input
                                    type='text'
                                    value={cliente?.ciudad}
                                    className='input-remito-localidad'
                                />
                            </div>
                            <div className='cont-telefono'>
                                <label className='lable-remito'>Tel:</label>
                                <input
                                    type='number'
                                    value={cliente?.telefono}
                                    className='input-remito-telefono'
                                />
                            </div>
                        </div>
                        <div className='cont-remito-datos-cliente-Item-AFIP'>
                            <div className='cont-CUIT'>
                                <label className='lable-remito'>CUIT:</label>
                                <input
                                    type='number'
                                    value={cliente?.cuit}
                                    className='input-remito-cuit' />
                            </div>
                            <div className='cont-IVA'>
                                <label className='lable-remito'>IVA:</label>
                                <input
                                    type='text'
                                    value={cliente?.iva}
                                    className='input-remito-iva'
                                />
                            </div>
                        </div>

                        <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                            {/* cond pago */}
                            <div className='cont-condicion-pago'>
                                <label className='lable-remito-condicion'>Condición de pago:</label>
                                <input
                                    type='text'
                                    id='condicion_pago'
                                    value={data.condicion_pago }
                                    onChange={(e) => { handleOnChange(e) }}
                                    className='input-remito-condicionPago'
                                />
                            </div>
                            {/* Estado */}
                            <div className='cont-condicion-pago'>
                                <label className='lable-remito-condicion'>Estado:</label>
                                <select id='estado' onChange={(e) => { handleOnChange(e) }} className='input-remito-condicionPago'>
                                    <option>Elija estado remito</option>
                                    <option value={'debe'}>Deudor</option>
                                    <option value={'pagado'}>Pagado</option>
                                </select>
                            </div>
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
                                {
                                    remito.items?.map(item => {
                                        return (
                                            <tr key={item.detalle}>
                                                <td>{item.cantidad}</td>
                                                <td>{item.detalle}</td>
                                                <td>{item.unitario}</td>
                                                <td>{item.importe}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                            <tfoot className='celda-total-cifra'>
                                <tr className="total-row">
                                    <td className='pie-tabla-palabra' colSpan="3">TOTAL</td>
                                    <td className='celda-total-cifra'>{remito.totPedido}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                {/* boton modif */}
                <button type='onSubmit'>Modificar</button>
            </form>

            {/* botón imprimir */}
            <button onClick={handleSavePDF} className='boton-imprimir'>Guardar como PDF</button>
        </div>
    )
}

export default RemitoModifica;