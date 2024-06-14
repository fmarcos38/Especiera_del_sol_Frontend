import React from 'react'
import FormularioProductoAlta from '../../Componentes/FormularioProductoAlta';
import './estilos.css';


function CreaProducto() {
    return (
        <div className='cont-pagina-crea-prod'>
            <h1>Formulario creación de producto</h1>
            <FormularioProductoAlta />
        </div>
    )
}

export default CreaProducto