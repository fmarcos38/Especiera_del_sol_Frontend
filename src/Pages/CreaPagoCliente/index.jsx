import React from 'react';
import { userLogData } from '../../LocalStorage';
import FormularioPagoCliente from '../../Componentes/FormularioPagoCliente'


function CreaPagoCliente() {
    
        const userLog = userLogData();
    
        if (userLog) {
            return (
                <div className='cont-page-creaAnticipo'>
                    <h1>Crea un pago cliente</h1>
                    <FormularioPagoCliente />
                </div>
            )
        }
    
}

export default CreaPagoCliente;