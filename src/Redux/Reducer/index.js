import { BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, BUSCA_PRODUCTO_POR_NOMBRE, BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO, GET_ALL_CLIENTES, GET_ALL_PRODUCTOS, GET_ALL_PROVEEDORES, GET_CLIENTE, RESET_CLIENTE } from "../Actions/actionType";

const initialState = {
    productos: [],
    producto: {},
    clientes: [],
    cliente: {},
    proveedores: [],
    proveedor: {},
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
        default:
            return state;
    }
}; 