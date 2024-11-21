import React, { useEffect, useState } from 'react';
import logoRemito from '../../Imagenes/logoYtexto.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { creaRemito, getAllRemitos, calcSaldoAnterior, resetCliente } from '../../Redux/Actions';
import { formatMoney, cortaPalabra, fechaArg } from '../../Helpers';
import Swal from 'sweetalert2';
import './estilos.css';


function Remito({ 
    operacion, fecha, numUltimoRemito, cliente, clienteExiste, items, totPedido, bultos, /* transporte ,*/ /* saldoAnt */ 
}) { 

    let nuevoNumeroRemito = 0; 
    let fechaAct;
    //manejo fecha
    if(fecha === undefined){
        fechaAct = Date();
    }else{
        fechaAct = fecha
    }
    //manejo del num del remito
    if (operacion === "venta" && !numUltimoRemito.ultimoRemito) {
        nuevoNumeroRemito = 1;
    } else if (operacion === "venta") {
        nuevoNumeroRemito = numUltimoRemito.ultimoRemito + 1;
    } else if (operacion === "muestra") {
        nuevoNumeroRemito = numUltimoRemito;
    }
    
    const [data, setData] = useState({        
        condicion_pago: "",
        estado: "Debe",
    }); 
    const [bultosActual, setBultos] = useState(bultos || '');
    //const [transporteActual, setTransporte] = useState(transporte || '');  
    const remitoAmostrar = useSelector(state => state.remito);
    //const {saldoAnt} = useSelector(state => state.saldoAnterior); 
    const dispatch = useDispatch();

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
    /* const handleChangeTransporte = (e) => {
        setTransporte(e.target.value)
    } */
    //calc tot kgs vendidos OJO con Bomob de higo
    const caclTotKgs = () => {
        let tot = 0;
        items?.map(item => {
            if(item.unidadMedida === 'unidad'){
                return tot;
            }
            return tot += Number(item.cantidad);
        });
        return tot.toFixed(2); //limita a 2 decimales
    };
    //crea el Remito/Venta
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!data.condicion_pago) {
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cond.venta",
                icon: 'error'
            });
        }/* else if(!data.estado){
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Estado",
                icon: 'error'
            });
        } */else if(!bultosActual){
            Swal.fire({
                title: 'Faltan datos !!',
                text: "Ingrese Cant de Bultos",
                icon: 'error'
            });
        }else if(!cliente.cuit){
            Swal.fire({
                title: 'Faltan cargar datos del cliente!!',
                text: "Ingrese datos del cliente",
                icon: 'error'
            });
        }
        else{        
            const dataBack = {
                numRemito: nuevoNumeroRemito,
                items,
                fecha: fechaAct,
                totPedido,
                tipoRemito: 'Venta',
                cuit: cliente.cuit,
                cliente: cliente.nombre + " " + cliente.apellido,
                condicion_pago: data.condicion_pago,
                estado: data.estado,
                bultos: bultosActual,
                //transporte: transporteActual,
            }; 
            dispatch(creaRemito(dataBack));
            setData({        
                condicion_pago: "",
                estado: "",
            });
            Swal.fire({
                title: 'Creado con éxito !!',
                icon: 'success'
            }).then(() => {
                // Recargar la página después de presionar "OK"
                window.location.reload();
            });
            //setTransporte("");
            setBultos("");
            dispatch(getAllRemitos());
        }
    };
    //función crea las filas de la tabla 8 y llena las q sean necesarias
    const renderRows = () => {
        const rows = items?.map(item => (
            <tr key={item.detalle}>
                <td>{item.cantidad}</td>
                <td>{cortaPalabra(item.detalle)}</td>
                <td>${formatMoney(item.unitario)}</td>
                <td>${formatMoney(item.importe)}</td>
            </tr>
        ));

        for (let i = rows?.length; i < 9; i++) {
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

    useEffect(()=>{
        if(cliente?.cuit){
            dispatch(calcSaldoAnterior(cliente?.cuit));  
        }
    },[cliente?.cuit, dispatch]);

    useEffect(() => {
        if (!clienteExiste) {
            // Código para limpiar los inputs
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('ciudad').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('cuit').value = '';
            document.getElementById('iva').value = '';
        }
    }, [clienteExiste]);

    useEffect(()=>{
        return()=>{dispatch(resetCliente())}    
    },[dispatch]); //nuevo


    return (
        <div className='cont-gralRemito'>
            <form onSubmit={handleOnSubmit} className='cont-form-remito'>
                <div id='remito' className='cont-remito'>
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
                                    <p className='num-remito'>N° {nuevoNumeroRemito}</p>
                                </div>
                                <div style={{ width: '90%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p className='fecha-remito'>Fecha: </p>
                                    <p>{fechaArg(fechaAct)}</p>
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
                        {/* nombre y ape */}
                        <div className='cont-remito-datos-cliente-Item-NombreYApe'>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Nombre:</label>
                                <input
                                    type='text'
                                    id='nombre'
                                    defaultValue={cliente?.nombre}
                                    className='input-remito-nombre'
                                    readOnly
                                />
                            </div>
                            <div className='cont-remito-datos-cliente-Item-Nombre'>
                                <label className='lable-remito'>Apellido:</label>
                                <input
                                    type='text'
                                    id='apellido'
                                    defaultValue={cliente?.apellido}
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
                                id='direccion'
                                defaultValue={cliente?.direccion}
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
                                    id='ciudad'
                                    defaultValue={cliente?.ciudad}
                                    className='input-remito-localidad'
                                    readOnly
                                />
                            </div>
                            <div className='cont-telefono'>
                                <label className='lable-remito'>Tel:</label>
                                <input
                                    type='number'
                                    id='telefono'
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
                                    id='cuit'
                                    defaultValue={cliente?.cuit}
                                    className='input-remito-cuit'
                                    readOnly
                                />
                            </div>
                            <div className='cont-IVA'>
                                <label className='lable-remito'>IVA:</label>
                                <input
                                    type='text'
                                    id='iva'
                                    defaultValue={cliente?.iva}
                                    className='input-remito-iva'
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* cond pago y Estado */}
                        <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                            {
                                operacion === 'venta' ? (
                                    <>
                                        <div className='cont-condicion-pago'>
                                            <label className='lable-remito-condicion'>Condición de pago:</label>
                                            <input
                                                type='text'
                                                defaultValue
                                                id='condicion_pago'
                                                value={operacion === "venta" ? data.condicion_pago : remitoAmostrar.condicion_pago}
                                                onChange={operacion === "venta" ? handleOnChange : null}
                                                className={operacion === 'venta' && !data.condicion_pago ? 'input-remito-SinCondicionPago' : 'input-remito-condicionPago'}
                                            />
                                        </div>
                                        {/* estado */}
                                        {/* <div className='cont-estado'>
                                            <label className='lable-remito-condicion'>Estado:</label>
                                            <select
                                                id='estado'
                                                onChange={handleOnChange}
                                                className={operacion === 'venta' && !data.estado ? 'input-remito-sinEstado' : 'input-remito-estado'}>
                                                {
                                                    operacion === "venta" ?
                                                        (
                                                            <>
                                                                <option>Elija estado</option>
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
                                        </div> */}
                                    </>
                                ) : (
                                    <div className='cont-p-cond-pago-y-estado'>
                                        <div className='cont-condicion-pago-p'>
                                            <p className='lable-remito-condicion'>Condicion de pago: {remitoAmostrar.condicion_pago}</p>
                                            {/* <p className='lable-remito-condicion'>Estado: {remitoAmostrar.estado}</p> */}
                                        </div>
                                    </div>
                                )
                            }
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
                                {/* fila saldo anterior */}
                                {/* <tr> 
                                    <td></td>
                                    <td>Saldo anterior</td>
                                    <td></td>
                                    <td>${formatMoney(saldoAnt)}</td>
                                </tr> */}
                                {/* fila tranporte */}
                                {/* <tr> 
                                    <td></td>
                                    <td>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <label>Transp:</label>
                                            {
                                                operacion === 'venta' ?
                                                    <input
                                                        type='text'
                                                        id='trasporte'
                                                        value={transporteActual}
                                                        onChange={(e) => handleChangeTransporte(e)}
                                                        placeholder='Ingresar Aquí'
                                                        className={operacion === 'venta' && !transporteActual ? 'sin-transporte' : 'input-transporte'}
                                                    /> :
                                                    <p
                                                        style={{ margin: '0', padding: '5px' }}
                                                    >
                                                        {transporte}
                                                    </p>
                                            }
                                        </div>                                        
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr> */}
                            </tbody>
                            <tfoot className='celda-total-cifra'>
                                <tr className="total-row">
                                    <td>{caclTotKgs()}</td>
                                    <td >
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <label
                                                style={{ marginRight: '5px', fontSize: '15px' }}
                                            >
                                                Bultos:
                                            </label>
                                            {
                                                operacion === 'venta' ?
                                                    <input
                                                        type='number'
                                                        id='bultos'
                                                        value={bultosActual}
                                                        onChange={(e) => handleChangeBulto(e)}
                                                        className={operacion === 'venta' && !bultosActual ? 'input-sin-bultos' : 'input-remito-bultos'}
                                                    /> :
                                                    bultos
                                            }
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className='celda-total-cifra'>${formatMoney(totPedido)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* palabra pagado en diagonal */}
                    <div className='cont-palabra-pagado'>
                    {
                        !operacion === "venta" &&
                        remitoAmostrar.estado === 'Pagado' &&
                        <p className='diagonal-text'>Pagado</p>
                    }
                    </div>
                </div>
                {
                    operacion === "venta" &&
                    <button type='onSubmit' className='btn-crea-pedido'>Crear Pedido</button>
                }
            </form>
        </div>
    );
}

export default Remito;