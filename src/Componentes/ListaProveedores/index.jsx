import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllProveedores } from '../../Redux/Actions';
import EditIcon from '@mui/icons-material/Edit';
import { AppContexto } from '../../Contexto';
import ModalEdicionProveedor from '../ModalEdicionProveedor';
import BotonEliminarProveedor from '../BotonEliminarProveedor';
import SearchBar from '../SearchBar';

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
            <SearchBar tipo={'proveedor'} listaItems={allP}/>
            {
                allP ?
                <table className="client-table">
                <thead>
                    <tr>
                        <th>Nombre</th>                        
                        <th>Razón Social</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Ciudad</th>                        
                        <th>Dirección</th>
                        <th>CUIT</th>
                        <th>IVA</th>
                        <th>Remitos</th>
                        <th style={{ width: 'auto' }}>Editar/Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allP?.map((p) => (
                            <tr key={p._id}>
                                <td>{p.nombre} {p.apellido}</td>
                                <td>{p.razonSocial}</td>
                                <td>{p.telefono}</td>
                                <td>{p.email}</td>
                                <td>{p.ciudad}</td>
                                <td>{p.direccion}</td>
                                <td>{p.cuit}</td>
                                <td>{p.iva}</td>
                                <td style={{width: '50px'}}>
                                    <button>
                                        REMITOS
                                    </button>
                                </td>                                
                                <td style={{width: '50px'}}>
                                    <div style={{display: 'flex'}} key={p._id}>
                                        <button 
                                            onClick={() => handleEditClick(p)}
                                            className='btn-edita-cliente'
                                        >
                                            <EditIcon/>
                                        </button>

                                        <BotonEliminarProveedor _id={p._id} nombre={p.nombre} apellido={p.apellido}/>
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