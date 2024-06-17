import React, { useState } from 'react';
import './estilos.css';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { buscaClientePorNombre, buscaProveedor } from '../../Redux/Actions';


function SearchBar({tipo}) {

    const [search, setSearch] = useState(''); 
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setSearch(e.target.value)
    };

    //funcion crea objeto nom y apell
    const creoObjetoNombreApellido = (data) => {
        const palabras = data.split(' '); 

        //creo el obj
        const obj = {
            nombre: palabras[0],
            apellido: palabras[1]
        }

        return obj;
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        if(search === ""){
            alert("Debes ingresar un nombre")
        }
        //asigno obj con nomb y ape
        const data = creoObjetoNombreApellido(search);

        if(tipo === "cliente"){
            dispatch(buscaClientePorNombre(data))
        }
        if(tipo === 'proveedor'){
            dispatch(buscaProveedor(data));
        }
        
    };


    return (
        <div className='cont-searchBar'>
            <form onSubmit={(e) => {handleOnClick(e)}} className='form-search'>
                <label className='label-search'>Encuantra un {tipo}</label>
                <div className='cont-input-buttom-search'>
                    <input type='text' value={search} onChange={(e)=>{handleOnChange(e)}} className='input-search' />
                    <button className='buttom-lupa-search'>
                        <SearchIcon 
                            style={{border: 'none', backgroundColor: 'white',}}
                        />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar