import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds, getAllRemitos } from '../../Redux/Actions';
import TablaVentas from '../TablaVentas';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import './estilos.css';

function ListaRemitosVentas() {

    const ventas = useSelector(state => state.remitosVentas);
    const [estado, setEstado] = useState("");
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
    //funcion calc el tot de entregas
    const totEntregas = () => {
        let tot = 0; 
        ventas.map(r => {
            r.entrego.map(e => {
                return tot += e.entrega;
            });
            return 0;
        });
        return tot;
    };
    //calcula ganacia
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

    useEffect(() => {
        dispatch(getAllRemitos(estado));
        dispatch(getAllProds());
    }, [dispatch, estado]);


    return (
        <div className='cont-lista-remitos-ventass'>
            <h1>Lista de Ventas</h1>
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha />
                    <FiltraDebePago />
                </div>
                <BotonResetFiltros />
            </div>
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