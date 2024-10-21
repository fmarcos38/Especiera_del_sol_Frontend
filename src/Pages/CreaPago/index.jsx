import React from 'react'
import FormularioPago from '../../Componentes/FormularioPago'
import { userLogData } from '../../LocalStorage';
import './estilos.css';


function CreaPago() {
    
    const userLog = userLogData();

    if (userLog) {
        return (
            <div className='cont-page-creaAnticipo'>
                <h1>Crea un pago</h1>
                <FormularioPago />
            </div>
        )
    }
}

export default CreaPago