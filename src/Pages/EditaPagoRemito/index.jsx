import React from 'react'
import FormularioPagoCliente from '../../Componentes/FormularioPagoCliente'
import './estilos.css'

function EditaPagoRemito() {
    return (
        <div className='cont-edita-formPago-page'>
            <FormularioPagoCliente tipoR={'Pago'}/>
        </div>
    )
}

export default EditaPagoRemito