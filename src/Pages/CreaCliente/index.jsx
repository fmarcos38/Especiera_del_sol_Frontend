import React from 'react'
import FormularioClienteAlta from '../../Componentes/FormularioClienteAlta'
import './estilos.css';


function CreaCliente() {
    return (
        <div className='cont-page-creaCliente'>
            <h1 className='h1-form-cliente'>Formulario de creación de nuevo Cliente</h1>
            <FormularioClienteAlta />
        </div>
    )
}

export default CreaCliente;