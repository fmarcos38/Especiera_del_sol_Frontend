import React from 'react';
import ListaRemitosCompras from '../../Componentes/ListaRemitosCompras';
import './estilos.css';
import { userLogData } from '../../LocalStorage';


function ListaRemitosComprasPage() {

  const userLog = userLogData();

  if(userLog){
    return (
      <div className='cont-page-listaRemitosCompra'>
          <ListaRemitosCompras/>
      </div>
    )
  }
}

export default ListaRemitosComprasPage;