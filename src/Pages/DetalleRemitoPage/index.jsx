import React from 'react'
import DetalleRemito from '../../Componentes/DetalleRemito'
import { userLogData } from '../../LocalStorage'

function DetalleRemitoPage() {

  const userLog = userLogData();

  if(userLog){
    return (
      <div>
          <DetalleRemito/>
      </div>
    )
  }
}

export default DetalleRemitoPage