import React from 'react'
import FormularioAnticipo from '../../Componentes/FormularioAnticipo'
import './estilos.css';


function CreaAnticipoPaga() {
    return (
        <div className='cont-page-creaAnticipo'>
            <h1>Crea anticipo a un proveedor</h1>
            <FormularioAnticipo />
        </div>
    )
}

export default CreaAnticipoPaga