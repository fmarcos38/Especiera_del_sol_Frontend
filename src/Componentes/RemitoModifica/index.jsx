import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoRemito from '../../Imagenes/logoYtexto.jpg';
import { useDispatch } from 'react-redux';
import { modificaRemito } from '../../Redux/Actions';
import { formatDate, formatMoney } from '../../Helpers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './estilos.css';

function RemitoModifica({ operacion, fechaRemito, cliente, remito, items, totPedido }) {

    const [condicion_pago, setCondicion_pago] = useState();
    const [estado, setEstado] = useState();
    const [bultosActual, setBultos] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'mm', 'a4'); // Orientación vertical A4
            const pdfWidth = pdf.internal.pageSize.getWidth();
            //const pdfHeight = pdf.internal.pageSize.getHeight();
    
            // Ajustamos el tamaño de la imagen para que ocupe todo el alto de la hoja
            const imgWidth = pdfWidth; // Ocupa todo el ancho
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            // Posicionamos la imagen en la parte superior
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('remito.pdf');
        });
    };

    const handleOnChangeCondicion = (e) => {
        setCondicion_pago(e.target.value);
    };
    const handleChangeBulto = (e) => {
        setBultos(e.target.value)
    }
    /* const handleChangeTransporte = (e) => {
        setTransporte(e.target.value)
    } */
    //calc tot kgs vendidos
    const caclTotKgs = () => {
        let tot = 0;
        items?.map(item => {
            if(item.unidadMedida === 'unidad'){
                return tot;
            }
            return tot += Number(item.cantidad);
        });
        return tot;
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!condicion_pago || !estado) {
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cond.venta y Estado",
                icon: 'error'
            });
        }
        if (bultosActual === 0) {
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cant de Bultos",
                icon: 'error'
            });
        }
        if (condicion_pago && estado && bultosActual !== 0) {
            const dataBack = {
                fecha: fechaRemito,
                numRemito: remito.numRemito,
                items,
                totPedido,
                cuit: cliente.cuit,
                condicion_pago: condicion_pago,
                estado: estado,
                bultos: bultosActual,
            }
            dispatch(modificaRemito(remito._id, dataBack));
            Swal.fire({
                title: 'Modificado con exito !!',
                icon: 'success'
            });
            navigate('/listaRemitosVentas')
        }
    };
    //función crea las filas de la tabla 8 y llena las q sean necesarias
    const renderRows = () => {
        const rows = items?.map(item => (
            <tr key={item.detalle}>
                <td>{item.cantidad}</td>
                <td>{item.detalle}</td>
                <td>{item.unitario}</td>
                <td>{item.importe}</td>
            </tr>
        ));

        for (let i = rows?.length; i < 14; i++) {
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

    useEffect(() => {
        if (remito) {
            setCondicion_pago(remito.condicion_pago);
            setEstado(remito.estado);
            setBultos(remito.bultos);
            /* setTransporte(remito.transporte); */
        }
    }, [remito]);


    return (
        <div className='cont-gralRemito'>
            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-remito'>
                <div className='cont-remito' id='pdf-content'>
                    {/* cont info superior */}
                    <div className='cont-remito-sup'>
                        <div className='cont-remito-sup-izq'>
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
                        <div className='cont-remito-sup-derecho'>
                            <div className='cont-remito-derecho-SUP'>
                                <div style={{ width: '90%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p className='derecho-SUP-titulo'>REMITO</p>
                                    <p className='num-remito'>N° {remito.numRemito}</p>
                                </div>
                                <div style={{ width: '90%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p className='fecha-remito'>Fecha: </p>
                                    <p>{formatDate(fechaRemito)}</p>
                                </div>
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
                                    value={condicion_pago}
                                    onChange={(e) => { handleOnChangeCondicion(e) }}
                                    className='input-remito-condicionPago'
                                />
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
                                <tr>
                                    <td></td>
                                    {/* <td>
                                        <div className='cont-tabla-transporte'>
                                            <label style={{ marginRight: '5px', fontSize: '15px' }}>Transp:</label>
                                            {
                                                operacion === 'editar' ?
                                                    <input
                                                        type='text'
                                                        id='trasporte'
                                                        value={transporteActual}
                                                        onChange={(e) => handleChangeTransporte(e)}
                                                        className='inputs-transp-bultos'
                                                    /> :
                                                    <p
                                                        style={{ margin: '0', padding: '5px' }}
                                                    >
                                                        {remito.transporte}
                                                    </p>
                                            }
                                        </div>
                                    </td> */}
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot className='celda-total-cifra'>
                                <tr className="total-row">
                                    <td>{caclTotKgs()}</td>
                                    <td>
                                        <div className='cont-tabla-transporte'>
                                            <label style={{ marginRight: '5px', fontSize: '15px' }}>Bultos: </label>
                                            {
                                                operacion === 'editar' ?
                                                    <input
                                                        type='number'
                                                        id='bultos'
                                                        value={bultosActual}
                                                        onChange={(e) => handleChangeBulto(e)}
                                                        className='inputs-transp-bultos'
                                                    /> :
                                                    remito.bultos
                                            }
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className='celda-total-cifra'>${formatMoney(totPedido)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className='cont-btns-modif-remito'>
                    {/* btn crea pedido */}
                    <button type='onSubmit' className='boton-imprimir-modif-remito'>Modificar Remito</button>

                    {/* botón imprimir */}
                    <button type='button' onClick={handleSavePDF} className='boton-imprimir-modif-remito'>Guardar como PDF</button>
                </div>
            </form>
        </div>
    )
}

export default RemitoModifica;