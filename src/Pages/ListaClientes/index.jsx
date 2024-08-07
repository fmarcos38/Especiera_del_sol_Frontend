import React from 'react'
import ListaClientes from '../../Componentes/ListaClientes'
import { userLogData } from '../../LocalStorage'

function ListaClientesPage() {

    //seguridad, evita ingresar desde la url
    //para eso encierro en un IF el return
    const userLog = userLogData();
    
    if (userLog) {
        return (
            <div style={{minHeight:'90vh'}}>
                <ListaClientes />
            </div>
        )
    }
}

export default ListaClientesPage