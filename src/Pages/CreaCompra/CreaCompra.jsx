import React from 'react';
import './estilos.css';
import FormularioCompras from '../../Componentes/FormularioCompra'

function CreaCompra() {
    return (
        <div className='cont-crea-compra'>        
            <h1>Carga datos de una compra</h1>
            <FormularioCompras />
        </div>
    )
}

export default CreaCompra;