import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllClientes } from '../../Redux/Actions';
import { AppContexto } from '../../Contexto';
import BotonEliminarCliente from '../BotonEliminarCliente';
import EditIcon from '@mui/icons-material/Edit';
import ModalEdicionCliente from '../ModalEdicionCliente';
import SearchBar from '../SearchBar';
import './estilos.css';


function ListaClientes() {

    const allC = useSelector(state => state.clientes); 
    const [buscaCliente, setBuscaCliente] = useState(allC);
    const [clienteAeditar, setClienteAeditar] = useState(null);    
    const dispatch = useDispatch();
    const contexto = useContext(AppContexto);
    
    //onChange para pasarle al comp. hijo searchbar - a pesar q el input está en el hijo
    const handleOnChangeBuscaCliente = (e) => {
        contexto.setSearch(e.target.value);
    };

    const handleEditClick = (cliente) => {
        setClienteAeditar(cliente);
        contexto.setModalClienteOpen(true);
    };

    useEffect(() => {
        dispatch(getAllClientes());
    }, [dispatch]);
    
    useEffect(() => {
        setBuscaCliente(
            allC.filter(c => c.nombreApellido.includes(contexto.search)));
    },[allC, contexto.search]);


    return (
        <div className='cont-lista-clientes'>
            <SearchBar handleOnChange={handleOnChangeBuscaCliente} vista={"cliente"}/>
            {
                allC ?
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
                        buscaCliente?.map((c) => (
                            <tr key={c._id}>
                                <td>{c.nombre} {c.apellido}</td>
                                <td>{c.razonSocial}</td>
                                <td>{c.telefono}</td>
                                <td>{c.email}</td>
                                <td>{c.ciudad}</td>
                                <td>{c.direccion}</td>
                                <td>{c.cuit}</td>
                                <td>{c.iva}</td>
                                <td style={{width: '50px'}}>
                                    <Link to={`/remitosCliente/${c.cuit}`}>
                                        <button>REMITOS</button> 
                                    </Link>
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
                contexto.modalClienteOpen && 
                <div className='cont-modal-lista-clientes'>
                    <ModalEdicionCliente c={clienteAeditar} setClienteAeditar={setClienteAeditar} />
                </div>
            }
        </div>
    )
}

export default ListaClientes;