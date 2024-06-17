import React, { useState } from 'react';
import './estilos.css';
import Autocomplete from '@mui/material/Autocomplete';

function SearchProducto({ allP }) {

    const [searchP, setSearchP] = useState('');

    const handleOnChange = (e) => {
        setSearchP(e.target.value);
    };


    return (
        <div className='cont-searchP'>
            <form>
                <label className='label-searchP'>Busca un Producto</label>
                <input type='text' onChange={(e) => {handleOnChange(e)}} />
            </form>
        </div>
    )
}

export default SearchProducto