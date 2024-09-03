import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotonEliminaProducto from '../BotonEliminaProducto';
import { getAllProds } from '../../Redux/Actions';
import { AppContexto } from '../../Contexto';
import SearchBar from '../SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../Helpers';
import './estilos.css';



function ListaProductos() {

    const allP = useSelector(state => state.productos);
    //estado prods filtrados
    const [filteredProductos, setFilteredProductos] = useState(allP);
    const contexto = useContext(AppContexto); 
    const dispatch = useDispatch();

    //change para search
    const handleOnChange = (e) => {        
        contexto.setSearch(e.target.value);
    };    
    
    const handleDeleteProduct = (id) => {
        dispatch(getAllProds());
    };

    //separo los useEffect para q no se dispare todo el tiempo geAll (si estuviera en el de abajo- todos juntos)
    useEffect(() => {
        dispatch(getAllProds());
    }, [dispatch]);
    
    useEffect(()=>{
        setFilteredProductos(
            allP.filter(producto =>
                producto.nombre.includes(contexto.search)
            )
        );
    },[allP, contexto.search, dispatch]);


    return (
        <div className='cont-lista-clientes'>
            <div className='cont-searchP'>
                <SearchBar handleOnChange={handleOnChange} vista={"producto"}/>
            </div>
            {
                filteredProductos ?
                    <table className="client-table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>x Kg</th>
                                <th>x 50Kg</th>
                                <th>x 100Kg</th>
                                <th>Envase Kg</th>
                                {/* <th>Envase Oferta(kg.)</th> */}
                                <th style={{ width: 'auto' }}>Editar/Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProductos?.map((p) => (
                                    <tr key={p._id}>
                                        <td>{p.nombre}</td>
                                        <td className="centered">${formatMoney(p.precioKg)}</td>  
                                        <td className="centered">${formatMoney(p.precio50)}</td>
                                        <td className="centered">${formatMoney(p.precio100)}</td>
                                        <td className="centered">{p.envase}</td>
                                        <td className="centered">
                                            <Link to={`/modifProd/${p._id}`}>
                                                <button className='btn-edita-cliente'>
                                                    <EditIcon />
                                                </button>
                                            </Link>                                            
                                            <BotonEliminaProducto _id={p._id} nombre={p.nombre} onDelete={handleDeleteProduct}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div style={{ color: 'black' }}>
                        No hay prods pa mostrar papu!!
                    </div>
            }
        </div>
    )
}

export default ListaProductos;