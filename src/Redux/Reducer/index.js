import { GET_ALL_CLIENTES, GET_ALL_PRODUCTOS, GET_CLIENTE, RESET_CLIENTE } from "../Actions/actionType";

const initialState = {
    productos: [],
    clientes: [],
    cliente: {},
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
        default:
            return state;
    }
}; 