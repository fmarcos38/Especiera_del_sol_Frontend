import { GET_ALL_CLIENTES, GET_ALL_PRODUCTOS } from "../Actions/actionType";

const initialState = {
    productos: [],
    clientes: [],
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_CLIENTES:
            return{
                ...state,
                clientes: action.payload,
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