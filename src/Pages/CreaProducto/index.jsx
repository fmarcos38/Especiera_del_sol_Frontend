import React from 'react'
import FormularioProducto from '../../Componentes/FormularioProducto'
import './estilos.css';


function CreaProducto() {
    return (
        <div className='cont-pagina-crea-prod'>
            <h1>Formulario creación de producto</h1>
            <FormularioProducto/>
        </div>
    )
}

export default CreaProducto