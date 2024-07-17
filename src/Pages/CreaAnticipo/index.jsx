import React from 'react'
import FormularioAnticipo from '../../Componentes/FormularioAnticipo'
import './estilos.css';
import { userLogData } from '../../LocalStorage';


function CreaAnticipoPaga() {
    
    const userLog = userLogData();

    if (userLog) {
        return (
            <div className='cont-page-creaAnticipo'>
                <h1>Crea anticipo a un proveedor</h1>
                <FormularioAnticipo />
            </div>
        )
    }
}

export default CreaAnticipoPaga