import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitoCompra, getAllProds, modificaAnticipoCompra, } from '../../Redux/Actions';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioCompra from '../FormularioCompra';
import TablaItemsRemitoCompra from '../TablaItemsRemitoCompra';
import Swal from 'sweetalert2';
import './estilos.css';

function EditaRemitoCompra() {
    const {_id} = useParams();
    const tipoOperacion = 'modifica';
    const remito = useSelector(state => state.remito); 
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //estado para compra
    const [compra, setCompra] = useState({});
    //estado para Anticipo
    const [anticipo, setAnticipo] = useState({}); 
    //estado para los items que se compran
    const [items, setItems] = useState({
        cantidad: "",
        detalle: "",
        unitario: "",
        importe: "",
    }); 
    //estado para la conmposicion del pedido
    const [pedido, setPedido] = useState(remito.items);

    const handleOnChangeItems = (e) => {
        setItems({...items, [e.target.id]: e.target.value});
    };
    const handleOnClickAgregaItem= () => {
        setPedido([...pedido, items]);
        setCompra({...compra, items: pedido});
        setItems({
            cantidad: 0,
            detalle: "",
            unitario: 0,
            importe: 0
        });
    };    
    const handleOnChangeDatosCompra = (e) => {
        if(e.target.id === "proveedor"){
            setCompra({...compra, proveedor: e.target.value});
        }else {
            setCompra({...compra, [e.target.id]:e.target.value});
        }
    };
    const handleOnSubmitModifica = (e) => {
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
            navigate('/listaRemitosCompras')
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
            Swal.fire({
                text: 'Modificado con exito',
                icon: 'success'
            });
            navigate('/listaRemitosCompras');
        }
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
        dispatch(getRemitoCompra(_id));
        dispatch(getAllProds());
    },[_id, dispatch]);

    useEffect(()=>{
        //siempre q se quiera llenar un form con la data q ya se tiene "en caso de q sea para modif" HACERLO dsd un USEEFFECT
        if(remito?.detalle === 'Compra'){
            setCompra(remito);
            setPedido(remito.items);
        }else{
            setAnticipo(remito)
        }
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
                            <h1>Modifica Compra</h1>
                            <FormularioCompra
                                tipoOperacion={tipoOperacion}
                                handleOnSubmit={handleOnSubmitModifica}
                                handleOnChangeDatosCompra={handleOnChangeDatosCompra}                                
                                numUltRemito={remito.numCompra}
                                compra={compra}
                                calcTotCompra={calcTotCompra}
                                items={items}
                                handleOnChangeItems={handleOnChangeItems}
                                productos={productos}
                                handleOnClickAgregaItem={handleOnClickAgregaItem}
                            />

                            {/* muestra pedido TABLA*/}
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
        </div>
    )
}

export default EditaRemitoCompra