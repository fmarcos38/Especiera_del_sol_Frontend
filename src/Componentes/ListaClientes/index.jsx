import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './estilos.css';
import BotonEliminarCliente from '../BotonEliminarCliente';
import { getAllClientes } from '../../Redux/Actions';
import BotonEditaCliente from '../BotonEditarCliente';
import ModalEdicionCliente from '../ModalEdicionCliente';

function ListaClientes() {

    const allC = useSelector(state => state.clientes); 
    const dispatch = useDispatch();
    const [editingClient, setEditingClient] = React.useState(null);

    const handleEditClick = (client) => {
        setEditingClient(client);
    };

    useEffect(() => {
        dispatch(getAllClientes());
    }, [dispatch]);
    

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
                                    <div style={{display: 'flex'}} key={c._id}>
                                        {/* <BotonEditaCliente c={c} /> */}
                                        <button onClick={() => handleEditClick(c)}>Edit</button>

                                        <BotonEliminarCliente _id={c._id} nombre={c.nombre} apellido={c.apellido} />
                                    </div>
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
            {
                editingClient && <ModalEdicionCliente c={editingClient} setEditingClient={setEditingClient} />
            }
           
        </div>
    )
}

export default ListaClientes;