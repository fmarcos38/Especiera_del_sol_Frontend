import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BotonEliminarCliente from '../BotonEliminarCliente';
import {  getAllProveedores } from '../../Redux/Actions';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto';
import ModalEdicionProveedor from '../ModalEdicionProveedor';

function ListaProveedores() {

    const [provAeditar, setProvAeditar] = useState(null);
    const allP = useSelector(state => state.proveedores); 
    const dispatch = useDispatch();
    const contexto = useContext(AppContexto);
    

    const handleEditClick = (prov) => {
        setProvAeditar(prov);
        contexto.setModalProveedorOpen(true);
    };

    useEffect(() => {
        dispatch(getAllProveedores());
    }, [dispatch]);
    

    return (
        <div className='cont-lista-clientes'>
            {
                allP ?
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
                        allP?.map((c) => (
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
                                        <button 
                                            onClick={() => handleEditClick(c)}
                                            className='btn-edita-cliente'
                                        >
                                            <EditIcon/>
                                        </button>

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
                contexto.modalProveedorOpen && 
                <div className='cont-modal-lista-clientes'>
                    <ModalEdicionProveedor provAeditar={provAeditar} setProvAeditar={setProvAeditar} />
                </div>
            }
        </div>
    )
}

export default ListaProveedores;