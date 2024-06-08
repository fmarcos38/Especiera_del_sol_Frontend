import React from 'react';
import { useSelector } from 'react-redux';
import './estilos.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ListaClientes() {

    const allC = useSelector(state => state.clientes); 


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
                                    <button className='btn-elim-prods'>
                                        <DeleteForeverIcon />
                                    </button>
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