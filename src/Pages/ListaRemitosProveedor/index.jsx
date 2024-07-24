import React from 'react'
import ListaRemitosProveedor from '../../Componentes/ListaRemitosProveedor'
import { userLogData } from '../../LocalStorage'

function ListaRemitosProveedorPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div style={{width:'100%'}}>
                <ListaRemitosProveedor />
            </div>
        )
    }
}

export default ListaRemitosProveedorPage