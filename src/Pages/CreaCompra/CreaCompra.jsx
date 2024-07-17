import React from 'react';
import './estilos.css';
import FormularioCompras from '../../Componentes/CreaCompra'
import { userLogData } from '../../LocalStorage';

function CreaCompra() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-crea-compra'>        
                <h1>Carga datos de una compra</h1>
                <FormularioCompras />
            </div>
        )
    }
}

export default CreaCompra;