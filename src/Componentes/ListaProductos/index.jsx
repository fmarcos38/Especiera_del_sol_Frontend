import React from 'react';
import { useSelector } from 'react-redux';
import './estilos.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ListaClientes() {

    const allC = useSelector(state => state.clientes); 


    return (
        <div className='cont-lista-clientes'>
            <table className="client-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Ciudad</th>
                    <th>Dirección</th>
                    <th style={{width: 'auto'}}>Edición</th>
                </tr>
            </thead>
            <tbody>
                {
                    allC?.map((c) => (
                    <tr key={c._id}>
                        <td>{c.nombre} {c.apellido}</td>
                        <td>{c.email}</td>
                        <td>{c.telefono}</td>
                        <td>{c.ciudad}</td>
                        <td>{c.direccion}</td>
                        <td>
                            <EditIcon/>
                            <DeleteForeverIcon/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default ListaClientes