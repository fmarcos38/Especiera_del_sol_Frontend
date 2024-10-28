import React, { useEffect, useState } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { creaAnticipo, getAllProds, getAllProveedores, getUlimoRemitoCompra, resetUltimoRemitocompra } from '../../Redux/Actions';
import TablaItemsRemitoCompra from '../TablaItemsRemitoCompra';
import Swal from 'sweetalert2';
//import FormularioCompra from '../FormularioCompra';

function FormularioCompras() {
    const tipoOperacion = 'compra';
    const productos = useSelector(state => state.productos);
    const proveedores = useSelector(state => state.proveedores);   
    const remito =  useSelector(state => state.ultimoRemito); 
    //estado fecha creacion remito
    const [fechaCreacion, setFechaCreacion] = useState('');  
    //estado para el num de compra
    const [numComp, setNumComp] = useState(0);
    //estado para los items que se compran
    const [items, setItems] = useState({
        cantidad: 0,
        detalle: "",
        unitario: 0,
        importe: 0
    });
    //estado para la conmposicion del pedido
    const [pedido, setPedido] = useState([]);
    //estado para detalle, unitario y total PERO de la compra Acordada con el provvedor
    const [compra, setCompra] = useState({
        numCompra: numComp,
        numRemitoProveedor: "",
        transporte: "",
        proveedor: "",
        detalle: 'Compra',
        total: 0,
        detallePago: "",
        items: [], 
        cuit: "",       
    }); 
    const dispatch = useDispatch();

    // Función para formatear la fecha a 'YYYY-MM-DD'
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade 0 si es necesario
        const day = ('0' + fecha.getDate()).slice(-2); // Añade 0 si es necesario
        return `${year}-${month}-${day}`;
    };

    const handleOnChangeNumCompra = (e) => {
        setNumComp(e.target.value)
    };
    const handleOnChangeItems = (e) => {
        setItems({...items, [e.target.id]: e.target.value});
    };
    const handleOnClickAgregaItem= (e) => {
        setPedido([...pedido, items]);
        setItems({
            cantidad: 0,
            detalle: "",
            unitario: 0,
            importe: 0
        });
    };    
    const handleOnChangeDatosCompra = (e) => {
        const { id, value } = e.target;
        //let updatedValue = value;

        if (id === 'proveedor') {
            const selectedProveedor = proveedores.find(p => `${p.nombre} ${p.apellido}` === value);
            if (selectedProveedor) {
                setCompra(prevCompra => ({
                    ...prevCompra,
                    proveedor: value,
                    cuit: selectedProveedor.cuit
                }));
            }
        } else {
            setCompra(prevCompra => ({
                ...prevCompra,
                [id]: value
            }));
        }
    };
    const handleOnChangeFechaCreacion = (e) => {
        setFechaCreacion(e.target.value);
    };
    
    //funcion calc total compra (recorrer el arreglo items)
    const calcTotCompra = () => {        
        let tot = 0;
        pedido?.map(item => {
            return tot += item.importe;
        });
        return tot;
    }; 
    //elimnina item
    const handleElimnimaItem = (detalle) => {
        const newPedido = pedido.filter(item => item.detalle !== detalle);
        setPedido(newPedido);
    };
    //func calc tot pedido(items)
    const calculaTotPedido = () => {
        let tot = 0;
        pedido?.map(item => {
            tot = tot + item.importe;
            return tot;
        });
        return tot;
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!compra.proveedor){
            Swal.fire({
                text:"faltan datos",
                icon:"error"
            });
        }else{
            const objetoCompra = {
                ...compra,
                fecha: fechaCreacion,
                total: calcTotCompra(),
                items: pedido,
                estado: "Debo",
            };
            dispatch(creaAnticipo(objetoCompra));            
            setCompra({
                numCompra: numComp,
                numRemitoProveedor: "",
                transporte: "",
                proveedor: "",
                detalle: 'Compra',
                total: 0,
                detallePago: "",
                items: [], 
                cuit: "",       
            });
            setFechaCreacion('');
            setItems([]);
            setPedido([]);
            Swal.fire({
                text: "Creado con exito!!",
                icon: "success"
            });
        }
    };
    
    //actualiza a la fecha actual
    useEffect(()=>{
        setFechaCreacion(obtenerFechaActual());
    }, []);
    useEffect(()=>{
        dispatch(getAllProds());
        dispatch(getAllProveedores());
    },[compra, dispatch]);
    //para el ultimo num remito
    useEffect(()=>{
        if(compra.proveedor !== ''){
            dispatch(getUlimoRemitoCompra(compra.proveedor));
        }

        return () => {dispatch(resetUltimoRemitocompra());}
    },[compra.proveedor, dispatch]);
    //para actualizar el num de compra
    useEffect(() => {
        let numUltRemito;
        if (remito === null) { 
            numUltRemito = 1; 
        } else { 
            numUltRemito = remito.numR + 1;
        }
        setNumComp(numUltRemito);
        setCompra(prevCompra => ({
            ...prevCompra,
            numCompra: numUltRemito
        }));
    }, [remito]);
    //para calcular el total del item 
    useEffect(() => {        
        if(items.cantidad && items.unitario){//con este if evito q se quede en un bucle
            const tot = items.cantidad * items.unitario;
            if(tot){
                setItems((prevItems) => ({
                    ...prevItems,
                    importe: tot,
                }));
            }else{
                setItems((prevItems) => ({
                    ...prevItems,
                    importe: 0,
                }));
            }
        } 
    }, [items.cantidad,items.unitario]);

    return (
        <div className='cont-vista-compra'>          
            {/* <FormularioCompra
                handleOnChangeNumCompra={handleOnChangeNumCompra}
                tipoOperacion={tipoOperacion}
                handleOnSubmit={handleOnSubmit} 
                handleOnChangeDatosCompra={handleOnChangeDatosCompra}
                proveedores={proveedores}
                numUltRemito={numComp}
                compra={compra}
                calcTotCompra={calcTotCompra}
                items={items}
                handleOnChangeItems={handleOnChangeItems}
                productos={productos}
                handleOnClickAgregaItem={handleOnClickAgregaItem}
                fechaCreacion={fechaCreacion}
                handleOnChangeFechaCreacion={handleOnChangeFechaCreacion}
            /> */}
            
            <form onSubmit={(e) => { handleOnSubmit(e) }} className='cont-form-compra'>
            {/* dato compra */}
            <div className='cont-items-pedido'>
                <h2 className='titulos-form-compra'>Carga datos de la compra</h2>
                {/* elije la fecha para el remito */}
                <div className='cont-fecha-compra'>
                        <label className='label-fecha-compra'>Fecha: </label>
                        <input
                            type='date'
                            id='fechaCreacionRemito'
                            value={fechaCreacion}
                            onChange={(e) => { handleOnChangeFechaCreacion(e) }}
                            className='input-cuit-remito'
                        />
                </div>
                {/* num remito - prov - detalle */}
                <div className='cont-compra-detalle-proveed'>
                    {/* si tipoOperacio es compra Proveedor -> un select | SI es  modifica -> un input*/}
                    {
                        tipoOperacion === 'compra' ? (
                            <div className='cont-item'>
                                <label className='label-crea-compra'>Proveedor:</label>
                                <select
                                    id="proveedor"
                                    onChange={(e) => handleOnChangeDatosCompra(e)}
                                    className='input-pedido nombre-proveedor-compra'
                                >
                                    <option>Seleccione prov</option>
                                    {
                                        proveedores?.map(p => {
                                            return (
                                                <option
                                                    key={p._id}
                                                    value={p.nombre + " " + p.apellido}
                                                >
                                                    {p.nombre + " " + p.apellido}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        ) : (
                            <div className='cont-item'>
                                <label className='label-crea-compra'>Proveedor</label>
                                <input
                                    type={'text'}
                                    value={compra.proveedor}
                                    className='input-pedido'
                                />
                            </div>
                        )
                    }
                    {/* num compra */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>N° Compra:</label>
                        <input
                            type={'number'}
                            id='numCompra'
                            value={numComp}
                            onChange={(e) => {handleOnChangeNumCompra(e)}}
                            className='input-pedido numCompra'
                        />
                    </div>
                    {/* num remito proveedor */}
                    <div className='cont-item'>
                        <label className='label-crea-compra'>N° Remito Proveedor:</label>
                        <input
                            type={'number'}
                            id='numRemitoProveedor'
                            value={compra.numRemitoProveedor}
                            onChange={(e) => { handleOnChangeDatosCompra(e) }}
                            className='input-pedido numRemitoProveedor'
                        />
                    </div>
                </div>

                {/* items compra */}
                <div className='cont-items-form-compra'>
                    <h2 className='titulos-form-compra'>Carga items de la compra</h2>
                    <div className='cont-items-compras'>
                        {/* detalle */}
                        <div className='cont-item-producto'>
                            <label className='label-crea-compra'>Nombre del Producto:</label>
                            <input
                                type="text"
                                id='detalle'
                                value={items.detalle}
                                onChange={(e) => { handleOnChangeItems(e) }}
                                list="product-list"
                                className='input-item-detalle-compra input-pedido'
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
                        <div className='cont-cant-precio-impo'>
                            {/* cantidad */}
                        <div className='cont-item-cantidad'>
                            <label className='label-crea-compra'>Cantidad:</label>
                            <input
                                type='number'
                                id='cantidad'
                                value={items.cantidad}
                                onChange={(e) => handleOnChangeItems(e)}
                                className='input-item-compra-cantidad input-pedido'
                            />
                        </div>
                        {/* Precio unitario */}
                        <div className='cont-item-unitario'>
                            <label className='label-crea-compra'>Precio Unitario:</label>
                            <input
                                type='number'
                                id='unitario'
                                value={items.unitario}
                                onChange={(e) => handleOnChangeItems(e)}
                                className='input-item-compra-precio input-pedido'
                            />
                        </div>
                        {/* importe */}
                        <div className='cont-item-importe'>
                            <label className='label-crea-compra'>Importe:</label>
                            <input
                                type='number'
                                id='importe'
                                value={items.importe}
                                className='input-item-compra-importe input-pedido'
                            />
                        </div>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={(e) => handleOnClickAgregaItem(e)}
                        className='btn-cargarProd btnCompra'
                    >
                        Cargar producto
                    </button>
                </div>
            </div>

            {/* botón crea compra */}
            <button type='onSubmit' className='btn-crea-pedido compra'>
                {
                    tipoOperacion === 'compra' ? "Crear compra" : "Modifica compra"
                }
            </button>
        </form>


            {/* muestra pedido TABLA */}
            <h2>Items pedido</h2>
            <div className='cont-tabla-items-pedido'>
                <TablaItemsRemitoCompra 
                    pedido={pedido}
                    handleElimnimaItem={handleElimnimaItem}
                    calculaTotPedido={calculaTotPedido}
                />
            </div>
        </div>        
    )
}

export default FormularioCompras;
