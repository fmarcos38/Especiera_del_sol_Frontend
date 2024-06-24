import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRemitosCliente } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import ModalRemito from '../ModalRemito';

function ListaRemitosCliente() {
    const remitosCliente = useSelector(state => state.remitosCliente); console.log("remitosCliente:", remitosCliente)
    const {cuit} = useParams(); 
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();

    const handleClick = () => {
        contexto.setModalRemito(true);
    };

    useEffect(()=>{
        dispatch(getRemitosCliente(cuit));
    },[cuit, dispatch]);


    return (
        <div>
            {
                remitosCliente ? (
                    <div>
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>N° Remito</th>
                                    <th>Fecha creación</th>
                                    <th>Cuit</th>
                                    <th>Condición Pago</th>
                                    <th>Estado</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    remitosCliente?.map(r => (
                                        <tr key={r._id}>
                                            <td>{r.numRemito}</td>
                                            <td>{r.fecha}</td>
                                            <td>{r.cuit}</td>
                                            <td>{r.condicion_pago}</td>
                                            <td>{r.estado}</td>
                                            <td>
                                                {
                                                    <button onClick={() => { handleClick() }}>Detalle</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {/* modal remito */}
                        {
                            contexto.modalRemito &&
                            <ModalRemito />
                        }
                    </div>
                ) : (
                    <>
                        <h1>No remitos para dicho cliente!!</h1>
                    </>
                )
            }
        </div>
    )
}

export default ListaRemitosCliente