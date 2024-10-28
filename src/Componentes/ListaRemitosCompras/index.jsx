import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompras, ordenaFechaCompras } from '../../Redux/Actions';
import TablaCompras from '../TablaCompras';
import FiltrosComprasVentasFecha from '../FiltrosComprasVentas';
import FiltraDebePago from '../FiltraDebePago';
import BotonResetFiltros from '../BotonResetFiltros';
import SearchOperacionesProveedor from '../SearchOperacionesProveedor';
import './estilos.css';


function ListaRemitos() {

    const remitos = useSelector(state => state.remitosCompras);
    //estado para las fechas
    const [fechaDesde, setFechaDesde] = useState(''); 
    const [fechaHasta, setFechaHasta] = useState('');
    const dispatch = useDispatch();
    //estado proveedor
    const [proveedor, setProveedor] = useState('');
    //estado para remitos de un prov
    const [remitosProv, setRemitosProv] = useState(remitos);

    // Manejo del cambio en el input del proveedor
    const handleOnChangeProveedor = (e) => {
        setProveedor(e.target.value);
    };
    //para filtro de fechas 
    const handleOnChFechaDesde = (e) => {
        setFechaDesde(e.target.value);
    };
    const handleOnChFechaHasta = (e) => {
        setFechaHasta(e.target.value);        
    };
    //para botones debe pagado fecha mas, fecha menos, reset
    const handleOnClick = (e) => {
        switch (e.target.id) {
            case 'debe':
                dispatch(getAllCompras("Compra", "todos", fechaDesde, fechaHasta)); //detalle, estado
                break;
            case 'pagado':
                dispatch(getAllCompras("Pago", "Pago", fechaDesde, fechaHasta)); 
                break;
            case 'fechaMax':
                dispatch(ordenaFechaCompras("fechaMax"));
                break;
            case 'fechaMin':
                dispatch(ordenaFechaCompras("fechaMin"));
                break;
            case 'todos':
                dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
                break;
            case 'mesActual':
                setFechaDesde('');
                setFechaHasta('');
                dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
                break;
            default:
                break; 
            
        }
    };

    // Efecto para filtrar remitos por proveedor en tiempo real
    useEffect(() => {
        if (proveedor.trim() !== '') {
            // Filtrar remitos que coincidan con el nombre del proveedor
            const remitosFiltrados = remitos.filter(r => 
                r.proveedor.toLowerCase().includes(proveedor.toLowerCase())
            );
            setRemitosProv(remitosFiltrados);
        } else {
            // Si no hay proveedor seleccionado, mostrar todos los remitos
            setRemitosProv(remitos);
        }
    }, [proveedor, remitos]);

    useEffect(()=>{
        dispatch(getAllCompras("todos", "todos", fechaDesde, fechaHasta));
    }, [dispatch, fechaDesde, fechaHasta]);


    return (
        <div className='cont-listaRemitosCompra-componente'>
            <h1 className='titulo-lista-compras'>Lista de compras</h1>
            {/* filtros */}
            <div className='cont-filtros-btnReset-lista-remitos-ventas'>
                <div className='cont-filtros-lista-remitos-ventas'>
                    <FiltrosComprasVentasFecha 
                        fechaDesde={fechaDesde}
                        handleOnChFechaDesde={handleOnChFechaDesde}
                        fechaHasta={fechaHasta}
                        handleOnChFechaHasta={handleOnChFechaHasta}
                        handleOnClick={handleOnClick}
                    />
                    <FiltraDebePago 
                        operacion={"compra"}
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

            {/* search */}
            <SearchOperacionesProveedor 
                proveedor={proveedor} 
                handleOnChangeProveedor={handleOnChangeProveedor} 
            />
            <TablaCompras compras={proveedor ? remitosProv : remitos}/>
        </div>
    )
}

export default ListaRemitos;