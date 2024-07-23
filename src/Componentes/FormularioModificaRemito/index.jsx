import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscaClientePorCuit, getRemitoById, getAllProds} from '../../Redux/Actions';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import RemitoModifica from '../RemitoModifica';
import { useParams } from 'react-router-dom';



function FormularioModificaRemito() {

    const {_id} = useParams();
    const remito = useSelector(state => state.remito); 
    const cliente = useSelector(state => state.cliente);    

    //estado arreglo pedido
    const [pedido, setPedido] = useState([]);     
    //estado item
    const [cantidad, setCantidad] = useState(""); 
    const [detalle, setDetalle] = useState("");
    const [unitario, setUnitario]= useState("");
    const [importe, setImporte] = useState("");
    const [costo, setCosto] = useState("");   
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    const handleChangeCantidad = (e) => {
        const cant = e.target.value;
        setCantidad(cant);
        totItem(cant, unitario);
    };
    const handleChangeDetalle = (e) => {
        const producto = e.target.value 
        const buscaItem = pedido.find(p => p.detalle === producto)
        if(buscaItem){ 
            alert("Ese producto ya fue ingresado !!");
            setDetalle("");
        }else{
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
    //funcion calcula tot import item
    const totItem = (cantidad, unitario) => {        
        const tot = cantidad * unitario;
        setImporte(tot);
        return tot;
    };    
    //funcion calc tot del pedido
    const calculaTotPedido = () => {
        let tot = 0;
        for(let i=0; i<pedido?.length; i++){
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
            //creo un obj para añadira al array de pedido
            const newItem = {
                cantidad,
                detalle,
                unitario,
                importe,
                costo
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
    //elimina item tabla pedido
    const handleElimnimaItem = (detalle) => {
        const newPedido = pedido.filter(p => p.detalle !== detalle);
        setPedido(newPedido);
    };

    useEffect(()=>{
        dispatch(getAllProds());
        dispatch(getRemitoById(_id)); 
        dispatch(buscaClientePorCuit(remito.cuit));
    },[_id, dispatch, remito.cuit]);

    useEffect(()=>{
        if(remito.items){
            setPedido(remito.items);
        }
    },[remito.items]);
    
    //para la carga de items
    useEffect(()=>{ 
        if(detalle){ 
            const prod = productos.find(p => p.nombre === detalle);
            setCantidad(prod?.envase);
            setCosto(prod?.costo);
            setUnitario(prod?.precioKg);
            setImporte(totItem(prod?.envase, prod?.precioKg));
        }
    },[detalle, productos]);


    return (
        <div className='cont-pedido'>
            <h1>Modificar Remito</h1>
            <h2>Eliminar Items existentes y añadir nuevos</h2>
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
                            defaultValue={costo}
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
                            pedido?.map(item => {
                                return (
                                    <tr key={item.detalle}>
                                        <td>{item.cantidad}</td>
                                        <td>{item.detalle}</td>
                                        <td>{item.unitario}</td>
                                        <td>{item.importe}</td>
                                        <td style={{display: 'flex', justifyContent: 'center'}}>
                                            <button onClick={() => {handleElimnimaItem(item.detalle)}} className='btn-elimina-item-pedido'>
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
            <div style={{marginTop: '30px', backgroundColor: 'antiquewhite'}}>
                <RemitoModifica 
                    operacion={"editar"}
                    cliente={cliente}
                    remito={remito} 
                    items={pedido} 
                    totPedido={calculaTotPedido()}
                />
            </div>

            
        </div>
    )
}

export default FormularioModificaRemito;