import React from 'react'
import FormRemito from '../../Componentes/FormularioRemito'
import { userLogData } from '../../LocalStorage';

function CreaRemitoVentaPage() {

    const userLog = userLogData();

    if(userLog){
        return (
            <div>
                <FormRemito tipo={"venta"} />
            </div>
        )
    }
}

export default CreaRemitoVentaPage;