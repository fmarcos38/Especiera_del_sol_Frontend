import React from 'react'
import ListaProductos from '../../Componentes/ListaProductos';
import { userLogData } from '../../LocalStorage';


function ListaProductosPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div>
                <ListaProductos />
            </div>
        )
    }
}

export default ListaProductosPage