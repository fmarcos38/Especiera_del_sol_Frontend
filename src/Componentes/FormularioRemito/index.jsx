import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscaClientePorNombre, getAllProds, resetCliente, traeUltimoRemito } from '../../Redux/Actions';
import Remito from '../Remito';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import './estilos.css';

function FormRemito({ tipo }) {

    const traeCliente = useSelector(state => state.cliente);
    const numUltimoRemito = useSelector(state => state.ultimoRemito);
    const productos = useSelector(state => state.productos);
    const [nombreApellido, setNombreApellido] = useState('');    
    //estados para el manejo del cliente  
    const [cliente, setCliente] = useState();
    const [clienteExiste, setClienteExiste] = useState(true);
    const [haBuscadoCliente, setHaBuscadoCliente] = useState(false); 
    // Estado arreglo pedido
    const [pedido, setPedido] = useState([]); 
    // Estados item
    const [unidadMedida, setUnidadMedida] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [detalle, setDetalle] = useState("");
    const [unitario, setUnitario] = useState("");
    const [costo, setCosto] = useState("");
    const [importe, setImporte] = useState("");
    const dispatch = useDispatch();

    const handleOnChangeNA = (e) => {
        setNombreApellido(e.target.value);
    };
    const handleClickCargaClienteRemito = (e) => {
        if (!nombreApellido) {
            alert("Ingrese un Nombre y Apellido !!");
            return;
        }
        setCliente(null);
        setHaBuscadoCliente(true); // Indicar que se ha buscado un cliente
        let separo = nombreApellido.split(' '); 
        const data = {
            nombre: separo[0], 
            apellido: separo[1]
        }; 
        dispatch(buscaClientePorNombre(data));
    };
    const handleChangeCantidad = (e) => {
        const cant = e.target.value;
        setCantidad(cant);
        totItem(cant, unitario);
    };
    const handleChangeDetalle = (e) => {
        const producto = e.target.value;
        const buscaItem = pedido.find(p => p.detalle === producto);
        if (buscaItem) {
            alert("Ese producto ya fue ingresado !!");
            setDetalle("");
        } else {
            setDetalle(producto);
        }
    };
    const handleChangeUnitario = (e) => {
        const unit = e.target.value;
        setUnitario(unit);
        totItem(cantidad, unit);
    };
    const handleChangeCosto = (e) => {
        setCosto(e.target.value);
    };
    // Función calcula tot import item
    const totItem = (cantidad, unitario) => {
        const tot = cantidad * unitario;
        setImporte(tot);
        return tot;
    };
    // Función calc tot del pedido
    const calculaTotPedido = () => {
        let tot = 0;
        for (let i = 0; i < pedido.length; i++) {
            let imp = parseInt(pedido[i].importe, 10);
            tot = tot + imp;
        }
        return tot;
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        if (!cantidad || !detalle || !unitario) {
            Swal.fire({
                title: "Faltan datos !!!",
                text: "Cantidad, detalle o unitario",
                icon: "success"
            });
        } else {
            // Creo un obj para añadir al array de pedido
            let newItem = {};
            if(unidadMedida === 'Unidad'){
                newItem = {
                    cantidad: 0,
                    detalle,
                    unitario,
                    importe,
                    costo,
                }
            }
            newItem = {
                cantidad,
                detalle,
                unitario,
                importe,
                costo,
            }

            setPedido([...pedido, newItem]);
            resetForm();
        }
    };
    const resetForm = () => {
        setCantidad('');
        setDetalle('');
        setUnitario('');
        setImporte('');
        setCosto('');
    }
    // Elimina item tabla pedido
    const handleEliminaItem = (index) => {
        const newPedido = pedido.filter((item,i) => i !== index);
        setPedido(newPedido);
    };
    // Para cliente cuando busca por CUIT
    useEffect(() => {
        if (haBuscadoCliente) {
            if (traeCliente !== "El cliente no existe") {
                setCliente(traeCliente);
                setClienteExiste(true); // Cliente existe                
            }else{
                Swal.fire({
                    text: 'El cliente no existe !!',
                    icon: 'error'
                });
                setClienteExiste(false); // Cliente no existe
                dispatch(resetCliente()) //para esetear el estado global(sino al ingresar 2 cuit inexistentes seguido no arroja el msj)
            }
        } else {
            setHaBuscadoCliente(true);            
        }
    }, [traeCliente, haBuscadoCliente, dispatch]);

    useEffect(() => {
        dispatch(getAllProds());
        dispatch(traeUltimoRemito());
    }, [dispatch]);

    useEffect(() => {
        if (detalle) {
            const prod = productos.find(p => p.nombre === detalle);
            setUnidadMedida(prod.unidadMedida);
            setCantidad(prod?.envase);
            setCosto(prod?.costo);
            setUnitario(prod?.precioKg);
            setImporte(totItem(prod?.envase, prod?.precioKg));
        }
    }, [detalle, productos]);

    return (
        <div className='cont-pedido'>
            <h1>VENTA</h1>
            <h2>Datos del cliente</h2>
            <div className='dato-cliente-cuit'>
                <label className='label-cuit-remito'>Nombre y Apellido: </label>
                <input 
                    type='text' 
                    id='nombreApellido' 
                    value={nombreApellido} 
                    onChange={(e) => {handleOnChangeNA(e)}} 
                    className='input-cuit-remito'
                />
                <button 
                    onClick={(e) => {handleClickCargaClienteRemito(e)}} 
                    className='btn-carga-data-cliente-remito'
                >
                    Cargar datos del Cliente al Remito
                </button>
            </div>

            <h2>Carga de items para la {tipo} y creación del Remito</h2>
            <form onSubmit={(e) => handelSubmit(e)} className='formulario'>
                <div className='cont-items-form'>
                    {/* detalle */}
                    <div className='cont-item-producto'>
                        <label className='label-formulario'>Nombre del Producto:</label>
                        <input
                            type="text"
                            id='detalle'
                            value={detalle}
                            onChange={(e) => { handleChangeDetalle(e) }}
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
                    {/* costo */}
                    <div className='cont-item-costo'>
                        <label className='label-formulario'>Costo del Producto:</label>
                        <input
                            type="number"
                            id='costo'
                            value={costo}
                            onChange={(e) => { handleChangeCosto(e) }}
                            className='input-costo-formulario'
                        />
                    </div>
                    {/* cantidad */}
                    <div className='cont-item-cantidad'>
                        <label className='label-formulario'>Cantidad:</label>
                        <input 
                            type='number' 
                            id='cantidad' 
                            value={cantidad} 
                            onChange={(e) => handleChangeCantidad(e)} 
                            className='input-cant-formulario' 
                        />
                    </div>                    
                    {/* Precio unitario */}
                    <div className='cont-item-unitario'>
                        <label className='label-formulario'>Precio Unitario:</label>
                        <input 
                            type='number' 
                            id='unitario' 
                            value={unitario} 
                            onChange={(e) => handleChangeUnitario(e)} 
                            className='input-unitario-formulario'
                        />
                    </div>
                    {/* importe */}
                    <div className='cont-item-importe'>
                        <label className='label-formulario'>Importe:</label>
                        <input 
                            type='text' 
                            id='importe' 
                            defaultValue={importe} 
                            className='input-importe-formulario'
                        />
                    </div>
                </div>
                
                <button type='onSubmit' className='btn-cargarProd'>Cargar producto</button>                
            </form>

            <h2>Items pedido</h2>
            {/* muestra pedido */}
            <div className='cont-tabla-items-pedido'>
                <table className="client-table">
                    <thead>
                        <tr>                            
                            <th>Cantidad</th>
                            <th>Detalle</th>
                            <th>P.Unitario</th>
                            <th>Importe</th>
                            <th style={{display: 'flex', justifyContent: 'center'}}>Elimina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedido?.map((item,index) => {
                                return (
                                    <tr key={item.index}>
                                        {
                                            item.detalle === "Bombones de Higo con nuez" ?
                                            <td>{item.cantidad}unid</td> :
                                            <td>{item.cantidad}kg</td>
                                        }
                                        <td>{item.detalle}</td>
                                        <td>{item.unitario}</td>
                                        <td>{item.importe}</td>
                                        <td style={{display: 'flex', justifyContent: 'center'}}>
                                            <button onClick={() => {handleEliminaItem(index)}} className='btn-elimina-item-pedido'>
                                                <DeleteIcon className='icono-elimina-item'/>
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
                        <td>{calculaTotPedido()}</td>
                    </tfoot>
                </table>
            </div>

            {/* Remito */}
            <div className='cont-remito-pedido'>
                <Remito 
                    operacion={"venta"} 
                    numUltimoRemito={numUltimoRemito} 
                    cliente={cliente} 
                    clienteExiste={clienteExiste}
                    items={pedido} 
                    totPedido={calculaTotPedido()}
                />
            </div>
        </div>
    )
}

export default FormRemito;
