import { 
    BUSCA_CLIENTE_POR_CUIT, BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, BUSCA_PRODUCTO_POR_NOMBRE, 
    BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO, FILTRA_FECHAS_REMITOS_CLIENTE, GET_ALL_CLIENTES, GET_ALL_PRODUCTOS, GET_ALL_PROVEEDORES, 
    GET_ALL_REMITOS, GET_ALL_REMITOS_COMPRA, GET_CLIENTE, GET_REMITO_BY_ID, GET_REMITOS_CLIENTE, ORDENA_FECHA, RESET_CLIENTE, ULTIMO_REMITO 
} from "../Actions/actionType";

const initialState = {
    productos: [],
    producto: {},
    clientes: [],
    cliente: {},
    proveedores: [],
    proveedor: {},
    remitos: [],
    ultimoRemito: {},
    remitosCliente: [],
    remito: {},
    load: false,
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
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
                clientes: [action.payload]
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
        case BUSCA_PRODUCTO_POR_NOMBRE:
            return{
                ...state,
                productos: [action.payload]
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
        case GET_ALL_REMITOS:
            return{
                ...state,
                remitos: action.payload
            }
        case ULTIMO_REMITO:
            return{
                ...state,
                ultimoRemito: action.payload,
            }
        case GET_REMITOS_CLIENTE:
            return{
                ...state,
                remitosCliente: action.payload
            }
        case GET_REMITO_BY_ID:
            return{
                ...state,
                remito: action.payload
            }
        case ORDENA_FECHA:
            let remitosOrdenados = [...state.remitosCliente];
            remitosOrdenados = remitosOrdenados.sort((a, b) => {
                let fechaA = new Date(a.fecha);
                let fechaB = new Date(b.fecha);

                if (action.payload === 'fechaMax') {
                    return fechaB - fechaA; // Orden descendente
                } else if (action.payload === 'fechaMin') {
                    return fechaA - fechaB; // Orden ascendente
                } else {
                    throw new Error('Criterio no válido. Usa "fechaMax" o "fechaMin".');
                }
            });
            return{
                ...state,
                remitosCliente: remitosOrdenados
            }
        case FILTRA_FECHAS_REMITOS_CLIENTE:
            let remitosFiltrar = [...state.remitosCliente];
            let fechaDesde = new Date(action.payload.fechaDesde);
            let fechaHasta = new Date(action.payload.fechaHasta);
            fechaHasta.setUTCHours(23, 59, 59, 999); // Incluir todo el día hasta la fecha final en UTC
            
            let remitosFiltrdos = remitosFiltrar.filter(r => {
                const fechaR = new Date(r.fecha);
                return fechaR >= fechaDesde && fechaR <= fechaHasta;
            })

            return{
                ...state,
                remitosCliente: remitosFiltrdos
            }
        case GET_ALL_REMITOS_COMPRA:
            return{
                ...state,
                remitos: action.payload
            }
        default:
            return state;
    }
}; 