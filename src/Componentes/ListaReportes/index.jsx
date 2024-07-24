import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReporteMesesAño } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import './estilos.css';
import { formatMoney } from '../../Helpers';


function ListaReportes() {
  
  const reporteMesesAño = useSelector(state => state.reporteMesesAño);
  const dispatch = useDispatch();
  const [año, setAño] = useState();
  const month = "";
  const meses = true;

  const handleOnchangeAño = (e) => {
    setAño(e.target.value);
  };
  const handleClikMostrar = () => {
    if(!año){
      Swal.fire({
        text: "Ingrese un año",
        icon: "error"
      });
    }else{
      dispatch(getReporteMesesAño(month, año, meses));
    }
  };
  const calcTotVentasBruto = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += mes.ventas;
    });
    return tot;
  };
  const calcTotGanancias = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += mes.ganancias;
    });
    return tot;
  };
  const calcTotCompras = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += mes.compras;
    });
    return tot;
  };
  const calcTotGastos = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += mes.gastos;
    });
    return tot;
  };
  const calcuTotKgs = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += mes.totKgs;
    });
    return tot;
  };

  return (
    <div className='cont-reportes'>
      <h1 className='titulo-reportes'>Reportes</h1>
      <div>
        <input 
          type='number' 
          value={año} 
          onChange={(e) => { handleOnchangeAño(e) }} 
          placeholder='ingrese año ejem: 2024' 
          className='input-año' 
        />
        <button
          onClick={() => { handleClikMostrar() }}
          className='btn-muestraReporte'
        >
          Mostrar resultados
        </button>
      </div>
      <h3 className='subTitulo-reportes'>Reportes año {año}</h3>
      {/* tabla */}
      <div className='cont-tabla-reportes'>
        <table className='client-table tabla-reportes'>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Kgs Vendidos</th>
              <th>Ventas en bruto</th>              
              <th>Compras</th>
              <th>Gastos</th>
              <th>Ganancia Ventas</th>
            </tr>
          </thead>
          <tbody>
            {
              reporteMesesAño?.map(r => {
                return(
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td>{r.totKgs}</td>
                    <td>${formatMoney(r.ventas)}</td>
                    <td>${formatMoney(r.compras)}</td>
                    <td>${formatMoney(r.gastos)}</td>
                    <td>${formatMoney(r.ganancias)}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
                <td></td>
                <td>{calcuTotKgs()}Kgs</td>
                <td>${formatMoney(calcTotVentasBruto())}</td>                
                <td>${formatMoney(calcTotCompras())}</td>
                <td>${formatMoney(calcTotGastos())}</td>
                <td>${formatMoney(calcTotGanancias())}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}

export default ListaReportes