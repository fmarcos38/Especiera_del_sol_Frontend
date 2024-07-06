import React, { useEffect, useState } from 'react';
import './estilos.css';
import { useDispatch, useSelector } from 'react-redux';
import { creaAnticipo, getAllProds, getAllProveedores, getUlimoRemitoCompra, resetUltimoRemitocompra } from '../../Redux/Actions';
import TablaItemsRemitoCompra from '../TablaItemsRemitoCompra';
import Swal from 'sweetalert2';
import FormularioCompra from '../FormularioCompra';


function FormularioCompras() {

    const tipoOperacion = 'compra';
    const productos = useSelector(state => state.productos);
    const proveedores = useSelector(state => state.proveedores);   
    const remito =  useSelector(state => state.ultimoRemito); 
    let numUltRemito = 0;
    if(remito === null) { numUltRemito = 1; } 
    if(remito !== null) { numUltRemito = remito.numR + 1; } 
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
        numRemito: 0,
        proveedor: "",
        detalle: 'Compra',
        producto: "",
        cantidad: 0,
        unitario: 0,
        total: 0,
        detallePago: "",
        items: [],        
    }); 
    const dispatch = useDispatch();

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
        setCompra({...compra, [e.target.id]:e.target.value});
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
                numRemito: numUltRemito, //corregir para obt el num de remito
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
            dispatch(creaAnticipo(objetoCompra));
            localStorage.setItem("numRemito", compra.numRemito);//actualizo numRemito en el localStorage
            Swal.fire({
                text: "Creado con exito!!",
                icon: "success"
            });
        }
    };
    //funcion calc total compra (NO items)
    const calcTotCompra = () => {        
        return compra.cantidad * compra.unitario;
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

    useEffect(()=>{
        dispatch(getAllProds());
        dispatch(getAllProveedores());      
    },[compra, dispatch]);

    useEffect(()=>{
        if(compra.proveedor !== ''){
            dispatch(getUlimoRemitoCompra(compra.proveedor));
        }

        return () => {dispatch(resetUltimoRemitocompra());}
    },[compra.proveedor, dispatch]);

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
            <FormularioCompra
                tipoOperacion={tipoOperacion}
                handleOnSubmit={handleOnSubmit} 
                handleOnChangeDatosCompra={handleOnChangeDatosCompra}
                proveedores={proveedores}
                numUltRemito={numUltRemito}
                compra={compra}
                calcTotCompra={calcTotCompra}
                items={items}
                handleOnChangeItems={handleOnChangeItems}
                productos={productos}
                handleOnClickAgregaItem={handleOnClickAgregaItem}
            />

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


    /*   */
export default FormularioCompras;           

