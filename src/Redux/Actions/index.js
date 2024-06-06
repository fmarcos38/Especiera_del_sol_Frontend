import axios from 'axios';

import { GET_ALL_CLIENTES } from './actionType';
import { local } from '../../URLs';

export function getAllClientes(){
    return async function(dispatch){
        const resp = await axios.get(`${local}/clientes`);
        console.log("Data: ", resp.data);
        dispatch({type: GET_ALL_CLIENTES, payload: resp.data});
    }
};