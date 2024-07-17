import React from 'react'
import FormularioProveedorAlta from '../../Componentes/FormularioProveedorAlta';
import { userLogData } from '../../LocalStorage';


function CreaProveedor() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <h1>Formulario de creación de proveedor</h1>
                <FormularioProveedorAlta />
            </div>
        )
    }
}

export default CreaProveedor;