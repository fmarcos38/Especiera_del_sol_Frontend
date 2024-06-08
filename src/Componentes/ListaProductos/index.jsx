import React from 'react';
import { useSelector } from 'react-redux';
import './estilos.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ListaProductos() {

    const allP = useSelector(state => state.productos); 


    return (
        <div className='cont-lista-clientes'>
            {
                allP ?
                <table className="client-table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Precio (x Kg)</th>
                        <th>Envase (kg.)</th>                        
                        <th style={{ width: 'auto' }}>Editar/Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allP?.map((p) => (
                            <tr key={p.nombre}>
                                <td>{p.nombre}</td>
                                <td className="centered">{p.precioKg}</td>
                                <td className="centered">{p.envase}</td>                                
                                <td className="centered">
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

export default ListaProductos;