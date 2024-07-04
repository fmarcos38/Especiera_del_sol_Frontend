import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitoCompra, getAllProds, modificaAnticipoCompra, } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './estilos.css';


function EditaRemitoCompra() {
    const {_id} = useParams();
    const remito = useSelector(state => state.remito);
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();
    //estado para compra
    const [compra, setCompra] = useState({
        numRemito: remito.numRemito,
        proveedor: remito.proveedor,
        detalle: remito.compra,
        producto: remito.producto,
        cantidad: remito.cantidad,
        unitario: remito.unitario,
        total: 0,
        detallePago: remito.detallePago,
        items: remito.items,        
    });
    //estado para Anticipo
    const [anticipo, setAnticipo] = useState({
        proveedor: remito.proveedor,
        detalle: remito.detalle,
        total: remito.total,
        detallePago: remito.detallePago,
        estado: remito.estado
    }); 
    //estado para los items que se compran
    const [items, setItems] = useState({
        cantidad: 0,
        detalle: "",
        unitario: 0,
        importe: 0
    });
    //estado para la conmposicion del pedido
    const [pedido, setPedido] = useState([]);

    const handleOnChangeItems = (e) => {
        setItems({...items, [e.target.id]: e.target.value});
    };
    const handleOnClickAgregaItem= () => {
        setPedido([...pedido, items]);
    };    
    const handleOnChangeDatosCompra = (e) => {
        if(e.target.id === "proveedor"){
            setCompra({...compra, proveedor: e.target.value});
        }else {
            setCompra({...compra, [e.target.id]:e.target.value});
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!compra.unitario){
            Swal.fire({
                text:"faltan datos",
                icon:"error"
            });
        }else{
            const objetoCompra = {
                numRemito: compra.numRemito, //corregir para obt el num de remito
                proveedor: compra.proveedor,
                detalle: compra.detalle,
                producto: compra.producto,
                cantidad: compra.cantidad,              
                total: calcTotCompra(),
                unitario: compra.unitario,
                estado: "Debo",
                detallePago: compra.detallePago,
                items: pedido,                
            };
            dispatch(modificaAnticipoCompra(_id, objetoCompra));//<-----modifica            
            Swal.fire({
                text: "Modificado con exito!!",
                icon: "success"
            });
        }
    };
    //funcion calc total compra (NO items)
    const calcTotCompra = () => {        
        return compra.cantidad * compra.unitario;
    };

    //---onChange y submit para Anticipo-----
    const handleOnChangeAnticipo = (e) => {
        setAnticipo({...anticipo, [e.target.id]: e.target.value});
    };
    const handleOnSubmitAnticipo = (e) => {
        e.preventDefault();
        if(!anticipo.total || !anticipo.detallePago){
            Swal.fire({
                text: "Faltan items!!",
                icon: "error"
            })
        }else{
            dispatch(modificaAnticipoCompra(_id, anticipo));
        }
    };

    useEffect(()=>{
        dispatch(getRemitoCompra(_id));
        dispatch(getAllProds());
    },[_id, dispatch]);

    return (
        <div className='cont-vista-modifRemitos-compra'>
            {
                /* si es anticipo */
                remito.detalle === 'Anticipo' ?
                    (
                        <div className='cont-form-modif-anticipo'>
                            <h1>Modifica anticipo</h1>
                            <form onSubmit={(e) => { handleOnSubmitAnticipo(e) }} className='cont-formulario-anticipo'>
                                <div className='cont-inputs-anticipo'>
                                    <div className='cont-item'>
                                        <label className='label-crea-compra'>Proveedor</label>
                                        <input
                                            type={'text'}
                                            value={anticipo.proveedor}
                                            className='input-detalle-anticipo'
                                        />
                                    </div>
                                    <div className='cont-item'>
                                        <label className='label-crea-compra'>Detalle:</label>
                                        <input
                                            type={'text'}
                                            id='detalle'
                                            value={remito.detalle}
                                            className='input-detalle-anticipo'
                                        />
                                    </div>
                                    <div className='cont-item'>
                                        <label className='label-crea-compra'>Monto a pagar:</label>
                                        <input
                                            type={'number'}
                                            id='total'
                                            value={anticipo.total}
                                            onChange={(e) => { handleOnChangeAnticipo(e) }}
                                            className='input-montoPagar-anticipo'
                                        />
                                    </div>
                                    <div className='cont-item'>
                                        <label className='label-crea-compra'>Detalle de pago:</label>
                                        <input
                                            type={'text'}
                                            id='detallePago'
                                            value={anticipo.detallePago}
                                            onChange={(e) => { handleOnChangeAnticipo(e) }}
                                            className='input-detallePago-anticipo'
                                        />
                                    </div>
                                </div>
                                <button type='onSubmit' className='btn-crea-pedido anticipo'>Modificar</button>
                            </form>
                        </div>
                    ) : (
                        <div className='cont-form-modif-anticipo'>
                            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-compra'>
                                {/* dato compra */}
                                <div className='cont-items-pedido'>
                                    <h2 className='titulos-form-compra'>Carga datos de la compra</h2>
                                    {/* num remito - prov - detalle */}
                                    <div className='cont-compra-detalle-proveed'>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>N° Remito:</label>
                                            <input
                                                type={'number'}
                                                value={remito.numRemito}
                                                /* onChange={() => { handleOnChange() }} */
                                                className='input-pedido numRemito'
                                            />
                                        </div>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Proveedor:</label>
                                            <input
                                                type={'text'}
                                                id='proveedor'
                                                value={remito.proveedor}
                                                className='input-pedido'
                                            />
                                        </div>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Detalle:</label>
                                            <input
                                                type={'text'}
                                                id='detalle'
                                                value={remito.detalle}
                                                className='input-pedido'
                                            />
                                        </div>
                                    </div>
                                    {/* producto - kg comprados - precio unitario - tot compra */}
                                    <div className='cont-compra-detalle-proveed'>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Producto:</label>
                                            <input
                                                type={'text'}
                                                id='producto'
                                                value={compra.producto}
                                                onChange={(e) => { handleOnChangeDatosCompra(e) }}
                                                className='input-pedido'
                                            />
                                        </div>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Cant Kg:</label>
                                            <input
                                                type={'number'}
                                                id='cantidad'
                                                value={compra.cantidad}
                                                onChange={(e) => { handleOnChangeDatosCompra(e) }}
                                                className='input-pedido'
                                            />
                                        </div>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Unitario:</label>
                                            <input
                                                type={'text'}
                                                id='unitario'
                                                value={compra.unitario}
                                                onChange={(e) => { handleOnChangeDatosCompra(e) }}
                                                className='input-pedido'
                                            />
                                        </div>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Total:</label>
                                            <input
                                                type={'number'}
                                                id='total'
                                                value={calcTotCompra()}
                                                onChange={(e) => { handleOnChangeDatosCompra(e) }}
                                                className='input-pedido'
                                            />
                                        </div>
                                    </div>
                                    {/* detalle pago y observaciones*/}
                                    <div className='cont-compra-detalle-proveed'>
                                        <div className='cont-item'>
                                            <label className='label-crea-compra'>Detalle Pago:</label>
                                            <input
                                                type={'text'}
                                                id='detallePago'
                                                value={compra.detallePago}
                                                onChange={(e) => { handleOnChangeDatosCompra(e) }}
                                                className='input-pedido'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* items compra */}
                                <div className='cont-items-form-compra'>
                                    <h2 className='titulos-form-compra'>Carga items de la compra</h2>
                                    <div className='cont-items-compra'>
                                        {/* cantidad */}
                                        <div className='cont-item-cantidad'>
                                            <label className='label-crea-compra'>Cantidad:</label>
                                            <input
                                                type='number'
                                                id='cantidad'
                                                value={items.cantidad}
                                                onChange={(e) => handleOnChangeItems(e)}
                                                className='input-cant-formulario'
                                            />
                                        </div>
                                        {/* detalle */}
                                        <div className='cont-item-producto'>
                                            <label className='label-crea-compra'>Nombre del Producto:</label>
                                            <input
                                                type="text"
                                                id='detalle'
                                                value={items.detalle}
                                                onChange={(e) => { handleOnChangeItems(e) }}
                                                list="product-list"
                                                className='input-producto-formulario'
                                            />
                                            {/* lista q aparecerá en el input */}
                                            <datalist id="product-list">
                                                {
                                                    productos.map(p => (
                                                        <option key={p._id} value={p.nombre} />
                                                    ))
                                                }
                                            </datalist>
                                        </div>
                                        {/* Precio unitario */}
                                        <div className='cont-item-unitario'>
                                            <label className='label-crea-compra'>Precio Unitario:</label>
                                            <input
                                                type='number'
                                                id='unitario'
                                                value={items.unitario}
                                                onChange={(e) => handleOnChangeItems(e)}
                                                className='input-unitario-formulario'
                                            />
                                        </div>
                                        <div className='cont-item-importe'>
                                            <label className='label-crea-compra'>Importe:</label>
                                            <input
                                                type='number'
                                                id='importe'
                                                value={items.importe}
                                                onChange={(e) => handleOnChangeItems(e)}
                                                className='input-importe-formulario'
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleOnClickAgregaItem(e)}
                                        className='btn-cargarProd btnCompra'
                                    >
                                        Cargar producto
                                    </button>
                                </div>
                                {/* botón crea compra */}
                                <button type='onSubmit' className='btn-crea-pedido compra'>Modifica compra</button>
                            </form>

                            {/* muestra pedido TABLA*/}
                            <h2>Items pedido</h2>
                            <div className='cont-tabla-items-pedido'>
                                <table className="client-table">
                                    <thead>
                                        <tr>
                                            <th>Cantidad</th>
                                            <th>Detalle</th>
                                            <th>P.Unitario</th>
                                            <th>Importe</th>
                                            <th style={{ display: 'flex', justifyContent: 'center' }}>Elimina</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pedido?.map(item => {
                                                return (
                                                    <tr key={item.detalle}>
                                                        <td>{item.cantidad}</td>
                                                        <td>{item.detalle}</td>
                                                        <td>{item.unitario}</td>
                                                        <td>{item.importe}</td>
                                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <button /* onClick={() => {handleElimnimaItem(item._id)}} */ className='btn-elimina-item-pedido'>
                                                                Elimnar{/* <DeleteIcon className='icono-elimina-item'/> */}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                    <tfoot>
                                        <td>TOTAL</td>
                                        <td></td>
                                        <td></td>
                                        <td>{/* {calculaTotPedido()} */}tot pedido</td>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default EditaRemitoCompra