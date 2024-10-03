import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReporteMesesAño, getReporteMes } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import './estilos.css';
import { formatMoney } from '../../Helpers';


function ListaReportes() {
  
  const reporteMesesAño = useSelector(state => state.reporteMesesAño);
  const reporteMes = useSelector(state => state.reporteMes);
  const [muestraTablaMes, setMuestraTablaMes] = useState(false); 
  let newReporteMes;
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const month = "";
  let meses = true;
  const dispatch = useDispatch();

  const handleOnchangeMes = (e) => {
    setMes(e.target.value);
    
  };
  const handleClikMostrarMes = () => {
    const dividoFecha = mes.split('-');
    const añoNumber = dividoFecha[0];
    const mesNumber = dividoFecha[1];
    if(!mes){
      Swal.fire({
        text: "Ingrese un mes",
        icon: "error"
      });
    }else{
      dispatch(getReporteMes(mesNumber, añoNumber, meses = false));
      setMuestraTablaMes(true)
    }
  };
  const handleOnchangeAño = (e) => {
    setAño(e.target.value);
  };
  const handleClikMostrarAño = () => {
    if(!año){
      Swal.fire({
        text: "Ingrese un año",
        icon: "error"
      });
    }else{
      dispatch(getReporteMesesAño(month, año, meses));
    }
  };
  const calcTotVentasBruto = (arr) => {
    let tot = 0;
    arr?.map(mes => {
      return tot += mes.ventas;
    });
    return tot;
  };
  const calcTotGanancias = (arr) => {
    let tot = 0;
    arr?.map(mes => {
      return tot += mes.ganancias;
    });
    return tot;
  };
  const calcTotCompras = (arr) => {
    let tot = 0;
    arr?.map(mes => {
      return tot += mes.compras;
    });
    return tot;
  };
  const calcTotGastos = (arr) => {
    let tot = 0;
    arr?.map(mes => {
      return tot += mes.gastos;
    });
    return tot;
  };
  const calcuTotKgs = (arr) => {
    let tot = 0;
    arr?.map(mes => {
      return tot += mes.totKgs;
    });
    return Math.floor(tot);
  };
  //func genera reporte
  const generoReporteMes = () => {
    // Verificar si reporteMes existe
    if (!reporteMes || typeof reporteMes !== 'object') {
      return [];
    }
  
    // Verificar que las propiedades ventas, compras y gastos sean arrays válidos
    const ventas = Array.isArray(reporteMes?.ventas) ? reporteMes.ventas : [];
    const compras = Array.isArray(reporteMes?.compras) ? reporteMes.compras : [];
    const gastos = Array.isArray(reporteMes?.gastos) ? reporteMes.gastos : [];
  
    // Función para obtener la cantidad de días en un mes específico
    const getDaysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
  
    // Verificar si el mes es válido antes de dividir la fecha
    if (!mes) return [];
  
    const dividoFecha = mes.split('-');
    const añoNumber = dividoFecha[0];
    const mesNumber = dividoFecha[1];
    const daysInMonth = getDaysInMonth(mesNumber, añoNumber);
  
    // Inicializar un array con los días del mes, con ventas, compras y gastos en 0
    const initialData = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      ventas: 0,
      compras: 0,
      gastos: 0,
      totKgs: 0,
    }));
  
    // Función para actualizar los datos
    const updateData = (initialData, data, type, weightField = null) => {
      data.forEach(item => {
        const date = new Date(item.fecha);
        const day = date.getDate();
        initialData[day - 1][type] += item.total || item.monto || item.totPedido || 0;
        if (weightField && item[weightField]) {
          initialData[day - 1]['totKgs'] += item[weightField];
        }
      });
      return initialData;
    };
  
    // Actualizar datos con ventas, compras, gastos y totKgs
    let updatedData = updateData([...initialData], ventas, 'ventas', 'totKgs');
    updatedData = updateData([...updatedData], compras, 'compras');
    updatedData = updateData([...updatedData], gastos, 'gastos');
  
    return updatedData;
  };  
  newReporteMes = generoReporteMes();

  return (
    <div className='cont-reportes'>
      <h1 className='titulo-reportes'>Reportes</h1>
      {/* mes y año*/}
      <div className='cont-reporte-mes'>
        <div className='cont-divLabelInput-btnMopstrar'>
          <div className='cont-label-input'>
            <label className='label-año'>Elija un mes: </label>
            <input
              type='month'
              id='mes'
              value={mes}
              onChange={(e) => { handleOnchangeMes(e) }}
              placeholder='ingrese año ejem: 2024'
              className='input-año'
            />
          </div>
          <button
            onClick={() => { handleClikMostrarMes() }}
            className='btn-muestraReporte'
          >
            Mostrar resultados
          </button>
        </div>

        <div className='cont-divLabelInput-btnMopstrar'>
          <div className='cont-label-input'>
            <label className='label-año'>Elija un año: </label>
            <input
              type='number'
              id='año'
              value={año}
              onChange={(e) => { handleOnchangeAño(e) }}
              placeholder='Ejem: 2024'
              className='input-año'
            />
          </div>
          <button
            onClick={() => { handleClikMostrarAño() }}
            className='btn-muestraReporte'
          >
            Mostrar resultados
          </button>
        </div>
      </div>

      {/* tablas por día */}
      <h3 className='subTitulo-reportes'>Reportes mes {mes} </h3>
      {
        muestraTablaMes &&
        <div className='cont-tabla-reportes'>
          <table className='client-table tabla-reportes'>
            <thead className='client-table tabla-reportes'>
              <tr>
                <th>Día</th>
                <th>Kgs Vendidos</th>
                <th>Ventas</th>
                <th>Compras</th>
                <th>Gastos</th>
              </tr>
            </thead>
            <tbody>
              {newReporteMes?.map((dayData, index) => (
                <tr key={index}>
                  <td>{dayData.day}</td>
                  <td>{dayData.totKgs.toFixed(2)}</td>
                  <td>${formatMoney(dayData.ventas)}</td>
                  <td>${formatMoney(dayData.compras)}</td>
                  <td>${formatMoney(dayData.gastos)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>{calcuTotKgs(newReporteMes)}Kgs</td>
                <td>${formatMoney(calcTotVentasBruto(newReporteMes))}</td>
                <td>${formatMoney(calcTotCompras(newReporteMes))}</td>
                <td>${formatMoney(calcTotGastos(newReporteMes))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      }
      <h3 className='subTitulo-reportes'>Reportes año {año}</h3>
      {/* tabla Año*/}
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
                return (
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
              <td>{calcuTotKgs(reporteMesesAño)}Kgs</td>
              <td>${formatMoney(calcTotVentasBruto(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotCompras(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotGastos(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotGanancias(reporteMesesAño))}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ListaReportes