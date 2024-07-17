import React from 'react'
import ListaReportes from '../../Componentes/ListaReportes'
import { userLogData } from '../../LocalStorage'

function ListaReportesPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div>
                <ListaReportes />
            </div>
        )
    }
}

export default ListaReportesPage