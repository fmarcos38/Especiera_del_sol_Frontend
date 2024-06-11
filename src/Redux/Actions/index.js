import axios from 'axios';
import { 
    BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, CREA_CLIENTE, ELIMINA_CLIENTE, GET_ALL_CLIENTES, 
    GET_ALL_PRODUCTOS, GET_CLIENTE, MODIFICA_CLIENTE, 
    RESET_CLIENTE
} from './actionType';
import { local } from '../../URLs';

//--CLIENTES------------------------------------------------------
//trae clientes
export function getAllClientes(){
    return async function(dispatch){
        const resp = await axios.get(`${local}/clientes`);
        dispatch({type: GET_ALL_CLIENTES, payload: resp.data});
    }
};
//trae cliete por ID
export function getClienteByID(_id){
    return async function(dispatch){
        const resp = await axios.get(`${local}/clientes/${_id}`);
        dispatch({type:GET_CLIENTE, payload:resp.data});
    }
}
//resetea cliente
export function resetCliente(){
    return function(dispatch){
        dispatch({type: RESET_CLIENTE});
    }
}
//trae por nombre y apellido
export function buscaClientePorNombre(data){
    return async function(dispatch){
        const resp = await axios.get(`${local}/clientes/buscaPorNombre?nombre=${data.nombre}&apellido=${data.apellido}`);
        dispatch({type: BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, payload:resp.data});
    }
};
//crea cliente
export function createCliente(data){
    return async function(dispatch){
        const resp = await axios.post(`${local}/clientes`, data);
        dispatch({type: CREA_CLIENTE, payload:resp.data});
    }
}
//elimina cliente
export function eliminaCliente(_id){
    return async function(dispatch){
        const resp = await axios.delete(`${local}/clientes/elimina/${_id}`);
        dispatch({type:ELIMINA_CLIENTE, payload:resp.data});
    }
};
//editar cliente
export function editaCliente(_id, data){
    return async function(dispatch){
        const resp = await axios.put(`${local}/clientes/modificaCliente/${_id}`, data);
        dispatch({type:MODIFICA_CLIENTE, payload:resp.data});
    }
}
//--PRODUCTOS-------------------------------------------------------
//trae prods
export function getAllProds(){
    return async function(dispatch){
        const resp = await axios.get(`${local}/productos`);
        dispatch({type: GET_ALL_PRODUCTOS, payload: resp.data});
    }
}
