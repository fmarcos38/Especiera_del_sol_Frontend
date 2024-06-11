import React from 'react'
import FormCliente from '../../Componentes/FormularioCliente'
import './estilos.css';


function CreaCliente() {
    return (
        <div className='cont-page-creaCliente'>
            <h1>Formulario de creación de nuevo Cliente</h1>
            <FormCliente />
        </div>
    )
}

export default CreaCliente;