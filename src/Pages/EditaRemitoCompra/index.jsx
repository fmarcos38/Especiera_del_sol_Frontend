import React from 'react'
import EditaRemitoCompra from '../../Componentes/EditaRemitoCompra'
import { userLogData } from '../../LocalStorage'

function EditaRemitoCompraPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div>
                <EditaRemitoCompra/>
            </div>
        )
    }
}

export default EditaRemitoCompraPage