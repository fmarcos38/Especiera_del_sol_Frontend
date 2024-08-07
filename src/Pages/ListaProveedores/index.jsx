import React from 'react'
import ListaProveedores from '../../Componentes/ListaProveedores'
import { userLogData } from '../../LocalStorage'

function ListaProveedoresPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div style={{minHeight:'90vh'}}>
                <ListaProveedores/>
            </div>
        )
    }
}

export default ListaProveedoresPage