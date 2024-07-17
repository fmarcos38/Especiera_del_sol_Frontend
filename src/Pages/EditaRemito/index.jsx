import React from 'react'
import EditaRemito from '../../Componentes/EditaRemito'
import { userLogData } from '../../LocalStorage'

function EditaRemitoPage() {

  const userLog = userLogData();

  if(userLog){
    return (
      <div>
          <EditaRemito/>
      </div>
    )
  }
}

export default EditaRemitoPage