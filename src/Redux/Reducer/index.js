import { 
    BUSCA_CLIENTE_POR_CUIT, BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, BUSCA_PRODUCTO_POR_NOMBRE, 
    BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO, FILTRA_FECHAS_REMITOS, GET_ALL_CLIENTES, GET_ALL_PRODUCTOS, 
    GET_ALL_PROVEEDORES, GET_ALL_REMITOS, GET_ALL_REMITOS_COMPRA, GET_CLIENTE, GET_GASTOS_MES, GET_REMITO_BY_ID, 
    GET_REMITO_COMPRA_BY_ID, GET_REMITOS_CLIENTE, GET_REMITOS_PROVEEDOR, GET_REPORTES_MES_AÑO, GET_REPORTE_MES,
    ORDENA_FECHA, RESET_CLIENTE, RESET_ULTIMO_REMITO_COMPRA, ULTIMO_REMITO, ULTIMO_REMITO_COMPRA, BUSCA_PROVEEDOR_POR_CUIT,
    ORDENA_FECHA_REMITO_COMPRA, GET_GASTOS_BY_ID, GET_PRODUCTO_BY_ID, RESET_REMITO, LOGIN, RESET_LOGIN,
    CALC_SALDO_ANTERIOR,
    RESET_PROV,
} from "../Actions/actionType";

const initialState = {
    user: null,
    productos: [],
    producto: {},
    clientes: [],
    cliente: {},
    proveedores: [],
    proveedor: {},
    remitos: [],
    remito: {},
    ultimoRemito: {},
    remitosVentas: [],
    remitosCompras: [],
    remitosCliente: [],
    saldoAnterior: {},
    gastos: [],
    gasto: {},    
    reporteMesesAño: [], 
    reporteMes: {},   
    load: false,
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                user: action.payload,
                error: null,
            }
        case RESET_LOGIN: 
        return{
            ...state,
            user: action.payload
            }
        case GET_ALL_CLIENTES:
            return{
                ...state,
                clientes: action.payload,
            }
        case GET_CLIENTE:
            return{
                ...state,
                cliente: action.payload
            }
        case BUSCA_CLIENTE_POR_NOMBRE_APELLIDO:
            return{
                ...state,
                cliente: action.payload
            }
        case BUSCA_CLIENTE_POR_CUIT:
            return{
                ...state,
                cliente: action.payload
            }
        case RESET_CLIENTE:
            return{
                ...state,
                cliente: {}
            }    
        case GET_ALL_PRODUCTOS:
            return{
                ...state,
                productos: action.payload
            }
        case GET_PRODUCTO_BY_ID:
            return{
                ...state,
                producto: action.payload
            }
        case BUSCA_PRODUCTO_POR_NOMBRE:
            return{
                ...state,
                productos: [action.payload]
            }
        case BUSCA_PROVEEDOR_POR_CUIT:
            return{
                ...state,
                proveedor: action.payload,
            }
        case GET_ALL_PROVEEDORES:
            return{
                ...state,
                proveedores: action.payload
            }
        case BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO:
            return {
                ...state,
                proveedores: [action.payload]
            }
        case RESET_PROV:
            return{
                ...state,
                proveedor: {}
            }
        case GET_ALL_REMITOS:
            return{
                ...state,
                remitosVentas: action.payload
            }
        case ULTIMO_REMITO:
            return{
                ...state,
                ultimoRemito: action.payload,
            }
        case GET_REMITOS_CLIENTE:
            return{
                ...state,
                remitos: action.payload
            }
        case GET_REMITO_BY_ID:
            return{
                ...state,
                remito: action.payload
            }
        case CALC_SALDO_ANTERIOR:
            return{
                ...state,
                saldoAnterior: action.payload
            }
        case ORDENA_FECHA:
            let remitosOrdenados = [...state.remitos];
            remitosOrdenados = remitosOrdenados.sort((a, b) => {
                let fechaA = new Date(a.fecha);
                let fechaB = new Date(b.fecha);

                if (action.payload === 'fechaMax') { 
                    return fechaB - fechaA;  
                } else if (action.payload === 'fechaMin') {
                    return fechaA - fechaB; 
                } else {
                    throw new Error('Criterio no válido. Usa "fechaMax" o "fechaMin".');
                }
            });
            return{
                ...state,
                remitos: remitosOrdenados
            }
        case FILTRA_FECHAS_REMITOS:
            let remitosFiltrar = [...state.remitosVentas];
            let fechaDesde = new Date(action.payload.fechaDesde); //fecha: 2024-07-01
            let fechaHasta = new Date(action.payload.fechaHasta);
            fechaHasta.setUTCHours(23, 59, 59, 999); // Incluir todo el día hasta la fecha final en UTC
            
            let remitosFiltrdos = remitosFiltrar.filter(r => {
                const fechaR = new Date(r.fecha);
                return fechaR >= fechaDesde && fechaR <= fechaHasta;
            })

            return{
                ...state,
                remitosVentas: remitosFiltrdos
            }
        case GET_ALL_REMITOS_COMPRA:
            return{
                ...state,
                remitosCompras: action.payload
            }
        case ORDENA_FECHA_REMITO_COMPRA:
            const compras = [...state.remitosCompras];
            let comprasOrdenadas = compras.sort((a, b) => {
                let fechaA = new Date(a.fecha);
                let fechaB = new Date(b.fecha);

                if(action.payload === 'fechaMax'){
                    return fechaB - fechaA; 
                }else if (action.payload === 'fechaMin') {
                    return fechaA - fechaB; 
                } else {
                    throw new Error('Criterio no válido. Usa "fechaMax" o "fechaMin".');
                }
            });
            return{
                ...state,
                remitosCompras: comprasOrdenadas
            }
        case GET_REMITOS_PROVEEDOR:
            return {
                ...state,
                remitos: action.payload
            }
        case GET_REMITO_COMPRA_BY_ID:
            return{
                ...state,
                remito: action.payload
            }
        case ULTIMO_REMITO_COMPRA:
            return{
                ...state,
                ultimoRemito: action.payload
            }
        case RESET_ULTIMO_REMITO_COMPRA:
            return{
                ...state,
                ultimoRemito: {}
            }
        case RESET_REMITO:
            return{
                ...state,
                remito: {}
            }
        case GET_GASTOS_MES:
            return {
                ...state,
                gastos: action.payload
            }
        case GET_GASTOS_BY_ID:
            return {
                ...state,
                gasto: action.payload
            }
        case GET_REPORTES_MES_AÑO:
            return{
                ...state,
                reporteMesesAño: action.payload
            }
        case GET_REPORTE_MES:
                return{
                    ...state,
                    reporteMes: action.payload
            }
        default:
            return state;
    }
}; 