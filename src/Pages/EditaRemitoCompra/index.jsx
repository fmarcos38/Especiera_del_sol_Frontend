import React from 'react'
import EditaRemitoCompra from '../../Componentes/EditaRemitoCompra'
import { userLogData } from '../../LocalStorage';
import './estilos.css';

function EditaRemitoCompraPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-page-modif-compra'>
                <EditaRemitoCompra/>
            </div>
        )
    }
}

export default EditaRemitoCompraPage