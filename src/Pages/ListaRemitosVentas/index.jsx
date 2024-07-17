import React from 'react'
import ListaRemitosVentas from '../../Componentes/ListaRemitoVentas'
import { userLogData } from '../../LocalStorage'

function ListaRemitosVentasPage() {

  const userLog = userLogData();

  if(userLog){
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
          <ListaRemitosVentas/>
      </div>
    )
  }
}

export default ListaRemitosVentasPage