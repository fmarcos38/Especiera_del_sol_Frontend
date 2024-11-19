import React from 'react'
import FormularioPago from '../../Componentes/FormularioPagoProveedor'
import { userLogData } from '../../LocalStorage';
import './estilos.css';


function CreaPagoProveedor() {
    
    const userLog = userLogData();

    if (userLog) {
        return (
            <div className='cont-page-creaAnticipo'>
                <h1>Crea un pago proveedor</h1>
                <FormularioPago />
            </div>
        )
    }
}

export default CreaPagoProveedor;