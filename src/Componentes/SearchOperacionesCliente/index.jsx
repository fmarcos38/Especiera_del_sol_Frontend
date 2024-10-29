import React from 'react';


function SearchOperacionesCliente({cliente, onChangeCliente}) {

    //actualiza 
    return (
        <div className='cont-searchBar'>
            <form>
                <label className='label-searchP'>Buscar Compras - Pagos por cliente:</label>
                <input 
                    type='text' 
                    value={cliente}
                    onChange={(e) => { onChangeCliente(e) }} 
                    className='input-search-producto'
                    placeholder={'Pepe Lopez'}
                />
            </form>
        </div>
    )
}

export default SearchOperacionesCliente;