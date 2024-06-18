import React, {useState} from 'react';
import swal from 'sweetalert2';
import './estilos.css';
import Remito from '../Remito';

function FormPedido() {

    //estado arreglo pedido
    const [pedido, setPedido] = useState([]); 
    //estado item
    const [item, setItem] = useState({cantidad: "", detalle: "", unitario: "", importe: ""}); 
    
    const handleOnChange = (e) => {
        setItem({...item, [e.target.id]: e.target.value});
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        if(item.cantidad === "" || item.detalle === "" || item.unitario === "" || item.importe === ""){
            swal({
                title: "Error",
                text: 'Falta completar correctamente el formulario',
                icon: "error",
                button: "Aceptar",
            })
        }else{
            setPedido([...pedido, item]);
        }
    };
    //funcion calc tot del pedido
    const calculaTotPedido = () => {
        let tot = 0;
        for(let i=0; i<pedido.length; i++){
            let imp = parseInt(pedido[i].importe, 10); 
            tot = tot + imp;
        }
        return tot;
    }; 
    

    return (
        <div className='cont-pedido'>
            <h2>Creación de pedido</h2>
            <form onSubmit={(e) => handelSubmit(e)} className='formulario'>
                <div className='cont-items-form'>
                    <div className='cont-item-cantidad'>
                        <label className='label-formulario'>Cantidad:</label>
                        <input type='number' id='cantidad' value={item.cantidad} onChange={(e) => handleOnChange(e)} className='input-cant-formulario' />
                    </div>
                    <div className='cont-item-producto'>
                        <label className='label-formulario'>Producto:</label>
                        <input type='text' id='detalle' value={item.detalle} onChange={(e) => handleOnChange(e)} className='input-producto-formulario' />
                    </div>
                    <div className='cont-item-unitario'>
                        <label className='label-formulario'>Precio Unitario:</label>
                        <input type='number' id='unitario' value={item.unitario} onChange={(e) => handleOnChange(e)} className='input-unitario-formulario' />
                    </div>
                    <div className='cont-item-importe'>
                        <label className='label-formulario'>Importe:</label>
                        <input type='number' id='importe' value={item.importe} onChange={(e) => handleOnChange(e)} className='input-importe-formulario' />
                    </div>
                </div>
                <div>
                    <button type='onSubmit' className='btn-cargarProd'>Cargar producto</button>
                </div>
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

            {/* botón crea pedido/remito */}
            <button>Crear Pedido/Remito</button>

            {/* Remito */}
            <div className='cont-remito-pedido'>
                <Remito items={pedido} total={calculaTotPedido()}/>
            </div>
        </div>
    )
}

export default FormPedido