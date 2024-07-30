import React from 'react'
import FormularioProveedorAlta from '../../Componentes/FormularioProveedorAlta';
import { userLogData } from '../../LocalStorage';
import './estilos.css';

function CreaProveedor() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-page-crea-prov'>
                <h1 className='h1-form-cliente'>Formulario de creación de proveedor</h1>
                <FormularioProveedorAlta />
            </div>
        )
    }
}

export default CreaProveedor;