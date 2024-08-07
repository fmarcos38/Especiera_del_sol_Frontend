import React from 'react'
import FormularioModifProd from '../../Componentes/FormularioProductoModifica';
import './estilos.css';


function ModifProducto() {
    return (
        <div className='cont-page-modifProd'>
            <h1>Modificar Producto</h1>
            <FormularioModifProd />
        </div>
    )
}

export default ModifProducto