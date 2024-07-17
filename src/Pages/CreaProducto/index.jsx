import React from 'react'
import FormularioProductoAlta from '../../Componentes/FormularioProductoAlta';
import './estilos.css';
import { userLogData } from '../../LocalStorage';


function CreaProducto() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-pagina-crea-prod'>
                <h1>Formulario creación de producto</h1>
                <FormularioProductoAlta />
            </div>
        )
    }
}

export default CreaProducto