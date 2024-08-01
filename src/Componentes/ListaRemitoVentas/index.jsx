import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds, getAllRemitos, ordenaPorFecha} from '../../Redux/Actions';
import TablaVentas from '../TablaVentas';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import Swal from 'sweetalert2';
import './estilos.css';

function ListaRemitosVentas() {

    const ventas = useSelector(state => state.remitosVentas);
    const [estado, setEstado] = useState("todas");
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const dispatch = useDispatch();

    //funcion calc el tot de las entregas
    const calcEntregas = (entregas, estado, totPedido) => {
        let tot=0;

        if(estado === "Pagado"){
            return totPedido;
        }else{
            if(entregas.length !== 0){
                entregas.map(e => {
                    return tot += e.entrega; 
                });
            }
        }

        return tot;
    };
    //funcion calcula las entregas y resta del saldo
    const calculaSaldo = (tot, entregas, estado) =>{
        let saldo = 0;

        if(estado === "Pagado"){
            return saldo;
        }else{
            if (entregas.length !== 0) {
                const totEntregas = calcEntregas(entregas);
                saldo = tot - totEntregas;
                return saldo;
            }else{
                return tot;
            }
        }
    };
    //calcula el total de todos los remitos
    const totRemitos = () => {
        let tot = 0;
        ventas.map(r => {
            tot = tot + r.totPedido;
            return tot;
        });
        return tot;
    };
    //funcion calc el tot de los saldos 
    const totSaldos = () => {
        let tot = 0; 
        ventas.map(r => {
            return tot += calculaSaldo(r.totPedido, r.entrego, r.estado); 
        });
        return tot;
    };
    //funcion calc el tot de entregas por remito
    const totEntregas = () => {
        let total = 0;
        ventas.forEach(r => {
            if(r.estado === "Pagado"){
                total += r.totPedido;
            }else{
                r.entrego.forEach(entrega => {
                    total += entrega.entrega;
                });
            }            
        });
        return total;
    }
    //calcula ganacia por remito
    const calcGanancia = (items) => {
        let totGanancia = 0;

        items?.map(item => {
            //let producto = productos.find(p => p.nombre === item.detalle); //console.log("prod:",producto)
            totGanancia += (item.unitario * item.cantidad) - (item.costo * item.cantidad);//q producto es?
            return totGanancia;
        });
        return totGanancia;
    };
    //calc tot Ganacias
    const calcTotGanancias = () => {
        let tot = 0;
        ventas.map(v => {
            tot += calcGanancia(v.items);
            return tot;
        });
        return tot;
    };

    //para filtro de fechas 
    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };
    const handleOnSubFechas = (e) => {
        e.preventDefault();
        if(!fechaDesde && !fechaHasta){
            Swal.fire({
                text: "Ingrese ambas fechas",
                icon: "error"
            });
        }        
        dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
        /* setFechaDesde("");
        setFechaHasta(""); */
    };
    //para botones debe pagado fecha mas, fecha menos
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                setEstado("Debe");
                dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
                break;
            case 'pagado':
                setEstado("Pagado");
                dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
                break;
            case 'fechaMax':
                dispatch(ordenaPorFecha("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaPorFecha("fechaMin"));
                break;
            case 'ambos':
                setEstado("todas");
                dispatch(getAllRemitos( estado, fechaDesde, fechaHasta));
                break;
            case 'mesActual':
                setEstado("todas");
                dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
                break;
            case 'borraFechas':
                setFechaDesde("");
                setFechaHasta("");
                break;
            default:
                break; 
            
        }
    };

    useEffect(() => {
        dispatch(getAllRemitos(estado, fechaDesde, fechaHasta));
        dispatch(getAllProds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, estado]);


    return (
        <div className='cont-lista-remitos-ventass'>
            <h1>Lista de Ventas</h1>
            {/* filtros */}
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha 
                        handleOnSubFechas={handleOnSubFechas}
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                        handleOnClick={handleOnClick}
                    />
                    <FiltraDebePago
                        operacion={"venta"}
                        handleOnClick={handleOnClick}
                    />
                </div>
                <BotonResetFiltros 
                    handleOnClick={handleOnClick}
                />
            </div>
            <h3 
                style={{margin:'5px', background:'yellow'}}
            >
                SI NO SE UTILIZA EL FILTRO POR FECHA, SE MUESTRAN LOS MOVIMIENTOS DEL MES ACTUAL
            </h3>
            <TablaVentas 
                ventas={ventas}
                calcGanancia={calcGanancia}
                calcEntregas={calcEntregas}
                calculaSaldo={calculaSaldo}
                totRemitos={totRemitos}
                totEntregas={totEntregas}
                totSaldos={totSaldos}
                calcTotGanancias={calcTotGanancias}
            />
        </div>
    )
}

export default ListaRemitosVentas