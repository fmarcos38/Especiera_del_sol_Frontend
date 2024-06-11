import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './estilos.css';
import BotonEliminarCliente from '../BotonEliminarCliente';
import { getAllClientes } from '../../Redux/Actions';
import BotonEditaCliente from '../BotonEditarCliente';
import ModalEdicionCliente from '../ModalEdicionCliente';
import { AppContexto } from '../../Contexto';

function ListaClientes() {

    const allC = useSelector(state => state.clientes); 
    const dispatch = useDispatch();
    const contexto = useContext(AppContexto); console.log("contexto:", contexto.modalClienteOpen);

    useEffect(() => {
        dispatch(getAllClientes());
    }, [dispatch, allC]);

    return (
        <div className='cont-lista-clientes'>
            {
                allC ?
                <table className="client-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Ciudad</th>                        
                        <th>Dirección</th>
                        <th>Remitos</th>
                        <th style={{ width: 'auto' }}>Editar/Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allC?.map((c) => (
                            <tr key={c.nombre}>
                                <td>{c.nombre} {c.apellido}</td>
                                <td>{c.telefono}</td>
                                <td>{c.email}</td>
                                <td>{c.ciudad}</td>
                                <td>{c.direccion}</td>
                                <td style={{width: '50px'}}>
                                    <button>
                                        REMITOS
                                    </button>
                                </td>                                
                                <td style={{width: '50px'}}>
                                    <BotonEditaCliente />
                                    <BotonEliminarCliente _id={c._id} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            :
            <div style={{color: 'black'}}>
                No hay Clientes pa mostrar papu!!
            </div>
            }

            {/* Modal edición cliente */}
            {
                contexto.modalClienteOpen && 
                <div>
                    <ModalEdicionCliente/>
                </div>
            }
        </div>
    )
}

export default ListaClientes;