import React from 'react'
import CreaGasto from '../../Componentes/CreaGasto';
import './estilos.css';
import { userLogData } from '../../LocalStorage';


function CreaGastoPage() {

    const userLog = userLogData();
    
    if(userLog){
        return (
            <div className='cont-gastos-page'>
                <CreaGasto />
            </div>
        )
    }
}

export default CreaGastoPage;