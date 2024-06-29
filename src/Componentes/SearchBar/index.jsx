import React, { useContext, useEffect } from 'react';
import './estilos.css';
import { AppContexto } from '../../Contexto';


function SearchBar({ handleOnChange }) {

    const contexto = useContext(AppContexto);
    //useEffect para q no me que en el estdo la busqueda de un componente anterior.
    useEffect(() => {
        contexto.setSearch("");
    }, []);

    return (
        <div className='cont-searchBar'>
            <form>
                <label className='label-searchP'>Buscar un Producto:</label>
                <input type='text' onChange={(e) => { handleOnChange(e) }} className='input-search-producto' />
            </form>
        </div>
    )
}

export default SearchBar