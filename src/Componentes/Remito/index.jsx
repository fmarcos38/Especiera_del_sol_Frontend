import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoRemito from '../../Imagenes/logo.png';
import textoLogo from '../../Imagenes/texto-logo.png';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { creaRemito } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import { formatDate, formatMoney } from '../../Helpers';

function Remito({ operacion, numUltimoRemito, cliente, items, totPedido, bultos = 0 }) { 

    let nuevoNumeroRemito = 0; 
    let fechaActual = Date(); 
    if (operacion === "venta" && !numUltimoRemito.ultimoRemito) {
        nuevoNumeroRemito = 1;
    } else if (operacion === "venta") {
        nuevoNumeroRemito = numUltimoRemito.ultimoRemito + 1;
    } else if (operacion === "muestra") {
        nuevoNumeroRemito = numUltimoRemito;
    }
    
    const [data, setData] = useState({        
        condicion_pago: "",
        estado: "",
    }); 
    //estado para la cant de bultos
    const [bultosActual, setBultos] = useState(bultos);
    const remitoAmostrar = useSelector(state => state.remito); 
    const dispatch = useDispatch();

    //funcion para guardar PDF
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
        if (e.target.id === 'estado') {
            setData({ ...data, estado: e.target.value });
        } else {
            setData({ ...data, [e.target.id]: e.target.value });
        }
    };
    const handleChangeBulto = (e) => {
        setBultos(e.target.value)
    }
    //calc tot kgs vendidos
    const caclTotKgs = () => {
        let tot = 0;
        items?.map(item => {
            return tot += item.cantidad;
        });
        return tot;
    };
    //crea el Remito/Venta
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!data.condicion_pago || !data.estado) {
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cond.venta y Estado",
                icon: 'error'
            });
        }else if(bultosActual === 0){
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cant de Bultos",
                icon: 'error'
            });
        } else {
            let fecha = new Date();             
            const dataBack = {
                numRemito: nuevoNumeroRemito,
                items,
                fecha: fecha,
                totPedido,
                cuit: cliente.cuit,
                cliente: cliente.nombre + " " + cliente.apellido,
                condicion_pago: data.condicion_pago,
                estado: data.estado,
                bultosActual,
                totKgs: caclTotKgs(),
            };
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
    //función crea las filas de la tabla 8 y llena las q sean necesarias
    const renderRows = () => {
        const rows = items?.map(item => (
            <tr key={item.detalle}>
                <td>{item.cantidad}</td>
                <td>{item.detalle}</td>
                <td>${formatMoney(item.unitario)}</td>
                <td>${formatMoney(item.importe)}</td>
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
            <form onSubmit={handleOnSubmit} className='cont-form-remito'>
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
                                <p className='num-remito'>N° {nuevoNumeroRemito}</p>
                                <p className='fecha-remito'>Fecha: {formatDate(fechaActual)}</p>
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
                                <input
                                    type='text'
                                    value={cliente?.nombre}
                                    className='input-remito-nombre'
                                    readOnly
                                />
                            </div>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Apellido:</label>
                                <input
                                    type='text'
                                    value={cliente?.apellido}
                                    className='input-remito-nombre'
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* domicilio */}
                        <div className='cont-remito-datos-cliente-Item-Direccion'>
                            <label className='lable-remito'>Domicilio:</label>
                            <input
                                type='text'
                                value={cliente?.direccion}
                                className='input-remito-nombre'
                                readOnly
                            />
                        </div>
                        {/* localidad y tel */}
                        <div className='cont-remito-datos-cliente-Item-Localidad-Telef'>
                            <div className='cont-localidad'>
                                <label className='lable-remito'>Localidad:</label>
                                <input
                                    type='text'
                                    value={cliente?.ciudad}
                                    className='input-remito-localidad'
                                    readOnly
                                />
                            </div>
                            <div className='cont-telefono'>
                                <label className='lable-remito'>Tel:</label>
                                <input
                                    type='number'
                                    value={cliente?.telefono}
                                    className='input-remito-telefono'
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* cuit - iva */}
                        <div className='cont-remito-datos-cliente-Item-AFIP'>
                            <div className='cont-CUIT'>
                                <label className='lable-remito'>CUIT:</label>
                                <input
                                    type='number'
                                    value={cliente?.cuit}
                                    className='input-remito-cuit'
                                    readOnly
                                />
                            </div>
                            <div className='cont-IVA'>
                                <label className='lable-remito'>IVA:</label>
                                <input
                                    type='text'
                                    value={cliente?.iva}
                                    className='input-remito-iva'
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* cond pago y Estado */}
                        <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                            <div className='cont-condicion-pago'>
                                <label className='lable-remito-condicion'>Condición de pago:</label>
                                <input
                                    type='text'
                                    id='condicion_pago'
                                    value={operacion === "venta" ? data.condicion_pago : remitoAmostrar.condicion_pago}
                                    onChange={operacion === "venta" ? handleOnChange : null}
                                    className='input-remito-condicionPago'
                                />
                            </div>
                            <div className='cont-estado'>
                                <label className='lable-remito-condicion'>Estado:</label>
                                <select id='estado' onChange={handleOnChange} className='input-remito-estado'>
                                    {
                                        operacion === "venta" ?
                                            (
                                                <>
                                                    <option>Elija estado remito</option>
                                                    <option value={'Debe'}>Deudor</option>
                                                    <option value={'Pagado'}>Pagado</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option>{remitoAmostrar.estado}</option>
                                                </>
                                            )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* tabla items */}
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
                                {renderRows()}
                            </tbody>
                            <tfoot className='celda-total-cifra'>
                                <tr className="total-row">
                                    <td>{caclTotKgs()}</td>
                                    <td className='pie-tabla-palabra'>
                                        Cant Bultos:
                                        {
                                            operacion === 'venta' ? 
                                            <input 
                                            type='number' 
                                            id='bultos' 
                                            value={bultosActual} 
                                            onChange={(e) => handleChangeBulto(e)} 
                                            className='input-bultos'
                                        /> :
                                        bultos
                                        } 
                                    </td>
                                    <td></td>
                                    <td className='celda-total-cifra'>${formatMoney(totPedido)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                {
                    operacion === "venta" &&
                    <button type='onSubmit' className='btn-crea-pedido'>Crear Pedido</button>
                }                
            </form>
            <div>
                {
                    operacion === "venta" &&
                    <button onClick={resetInputs} className='btn-limpiar-datos'>Limpiar datos</button>
                }
                <button onClick={handleSavePDF} className='boton-imprimir'>Imprimir</button>
            </div>
        </div>
    );
}

export default Remito;
