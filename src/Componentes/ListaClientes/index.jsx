import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './estilos.css';
import EditIcon from '@mui/icons-material/Edit';
import BotonEliminarCliente from '../BotonEliminarCliente';
import { getAllClientes } from '../../Redux/Actions';

function ListaClientes() {

    const allC = useSelector(state => state.clientes); 
    const dispatch = useDispatch();

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
                                <td>
                                    <button>
                                        REMITOS
                                    </button>
                                </td>                                
                                <td>
                                    <button className='btn-edit-prods'>
                                        <EditIcon />
                                    </button>
                                    <BotonEliminarCliente _id={c._id}/>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            :
            <div style={{color: 'black'}}>
                No hay prods pa mostrar papu!!
            </div>
            }
        </div>
    )
}

export default ListaClientes;