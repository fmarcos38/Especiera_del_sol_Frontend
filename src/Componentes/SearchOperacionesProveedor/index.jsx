import React from 'react';


function SearchOperacionesProveedor({proveedor, handleOnChangeProveedor}) {

    //actualiza 
    return (
        <div className='cont-searchBar'>
            <form>
                <label className='label-searchP'>Buscar Compras - Pagos por proveedor|:</label>
                <input 
                    type='text' 
                    value={proveedor}
                    onChange={(e) => { handleOnChangeProveedor(e) }} 
                    className='input-search-producto'
                    placeholder={'Pepe Lopez'}
                />
            </form>
        </div>
    )
}

export default SearchOperacionesProveedor;