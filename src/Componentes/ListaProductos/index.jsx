import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotonEliminaProducto from '../BotonEliminaProducto';
import { getAllProds } from '../../Redux/Actions';
import { AppContexto } from '../../Contexto';
import ModalImgProducto from '../ModalImgProducto';
import SearchBar from '../SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import './estilos.css';
import { Link } from 'react-router-dom';


function ListaProductos() {

    const allP = useSelector(state => state.productos);
    //estado prods filtrados
    const [filteredProductos, setFilteredProductos] = useState(allP);
    //estado para la img q se verá en grande
    const [imgGrande, setImgGrande] = useState("");
    const contexto = useContext(AppContexto); 
    const dispatch = useDispatch();

    //change para search
    const handleOnChange = (e) => {        
        contexto.setSearch(e.target.value);
    };    
    const handleMouseEnter = (imgP) => {
        setImgGrande(imgP)
        contexto.setModalImgOpen(true);
    };
    const hadleMouseLeave = () => {
        contexto.setModalImgOpen(false);
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
                                <th>Imágen</th>
                                <th>Descripción</th>
                                <th>Precio (x Kg)</th>
                                <th>Envase (kg.)</th>
                                <th style={{ width: 'auto' }}>Editar/Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProductos?.map((p) => (
                                    <tr key={p._id}>
                                        <td className="centered">
                                            <img src={p.imagen} alt='' style={{ width: '70px', height: '50px' }} onMouseEnter={() => { handleMouseEnter(p.imagen) }} onMouseLeave={hadleMouseLeave} />
                                        </td>
                                        <td>{p.nombre}</td>
                                        <td className="centered">{p.precioKg}</td>
                                        <td className="centered">{p.envase}</td>
                                        <td className="centered">
                                            <Link to={`/modifProd/${p._id}`}>
                                                <button className='btn-edita-cliente'>
                                                    <EditIcon />
                                                </button>
                                            </Link>                                            
                                            <BotonEliminaProducto _id={p._id} nombre={p.nombre} />
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
            
            {/* vista grande imag prod */}
            {
                contexto.modalImgOpen && (
                    <div className='cont-modal-lista-clientes'>
                        <ModalImgProducto img={imgGrande}/>
                    </div>
                )
            }
        </div>
    )
}

export default ListaProductos;