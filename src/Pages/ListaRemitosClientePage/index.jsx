import React from 'react'
import ListaRemitosCliente from '../../Componentes/ListaRemitosCliente'
import { userLogData } from '../../LocalStorage'

function ListaRemitosClientePage() {

  const userLog = userLogData();

  if(userLog){
    return (
      <div className='cont-listaRemitosCliente'>
        <ListaRemitosCliente/>
      </div>
    )
  }  
}

export default ListaRemitosClientePage