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
  const calcSaldo = (v,c,g) => {
    let saldo = 0;
    saldo = v - c - g;
    return saldo;
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
  const calcTotSaldos = () => {
    let tot = 0;
    reporteMesesAño.map(mes => {
      return tot += calcSaldo(mes.ventas, mes.compras, mes.ganancias);
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

      {/* tabla */}
      <div>
        <table className='client-table'>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Ventas en bruto</th>
              <th>Ganancia Ventas</th>
              <th>Compras</th>
              <th>Gastos</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {
              reporteMesesAño?.map(r => {
                return(
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td>${formatMoney(r.ventas)}</td>
                    <td>${formatMoney(r.ganancias)}</td>
                    <td>${formatMoney(r.compras)}</td>
                    <td>${formatMoney(r.gastos)}</td>
                    {/* <td>${formatMoney(calcSaldo(r.ventas, r.compras, r.gastos))}</td> */}
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
                <td></td>
                <td>${formatMoney(calcTotVentasBruto())}</td>
                <td>${formatMoney(calcTotGanancias())}</td>
                <td>${formatMoney(calcTotCompras())}</td>
                <td>${formatMoney(calcTotGastos())}</td>
                {/* <td>${formatMoney(calcTotSaldos())}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}

export default ListaReportes