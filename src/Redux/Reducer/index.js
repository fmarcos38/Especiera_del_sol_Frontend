import { GET_ALL_CLIENTES } from "../Actions/actionType";

const initialState = {
    clientes: [],
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_CLIENTES:
            return{
                ...state,
                clientes: action.payload,
            }
        default:
            return state;
    }
}; 