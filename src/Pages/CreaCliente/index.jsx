import React from 'react';
import { userLogData } from '../../LocalStorage'
import FormularioClienteAlta from '../../Componentes/FormularioClienteAlta'
import './estilos.css';


function CreaCliente() {
    //seguridad, evita ingresar desde la url
    //para eso encierro en un IF el return
    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-page-creaCliente'>
                <h1 className='h1-form-cliente'>Formulario de creación de nuevo Cliente</h1>
                <FormularioClienteAlta />
            </div>
        )
    }
}

export default CreaCliente;