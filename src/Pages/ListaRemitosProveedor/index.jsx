import React from 'react'
import ListaRemitosProveedor from '../../Componentes/ListaRemitosProveedor'
import { userLogData } from '../../LocalStorage'
import './estilos.css';


function ListaRemitosProveedorPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div className='cont-page-listaProv'>
                <ListaRemitosProveedor />
            </div>
        )
    }
}

export default ListaRemitosProveedorPage