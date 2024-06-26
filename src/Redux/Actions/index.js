import axios from 'axios';
import { 
    BUSCA_CLIENTE_POR_NOMBRE_APELLIDO, CREA_CLIENTE, CREA_PROVEEDOR, ELIMINA_CLIENTE, ELIMINA_PRODUCTO, GET_ALL_CLIENTES, 
    GET_ALL_PRODUCTOS, GET_ALL_PROVEEDORES, GET_CLIENTE, MODIFICA_CLIENTE, BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO,
    RESET_CLIENTE, BUSCA_PRODUCTO_POR_NOMBRE, GET_ALL_REMITOS, CREA_REMITO,  BUSCA_CLIENTE_POR_CUIT, ULTIMO_REMITO,
    GET_REMITOS_CLIENTE, GET_REMITO_BY_ID,
} from './actionType';
import { local } from '../../URLs';
import Swal from 'sweetalert2';


//---LOGIN--------------------------------------------------------
export function login(data){
    return async function(){
        const resp = await axios.post(`${local}/auth/login`, data);
        //asigno data del user al localStorage
        localStorage.setItem("userData", JSON.stringify(resp.data));
    }
}

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
//trae cliente por CUIT
export function buscaClientePorCuit(cuit){
    return async function(dispatch){
        const resp = await axios.get(`${local}/clientes/cuit?cuit=${cuit}`);
        dispatch({type:BUSCA_CLIENTE_POR_CUIT, payload: resp.data}); 
            /* if(resp.data?.nombre){            
                Swal.fire({
                    title: "Datos cargados!!",                
                    icon: "success"
                });
            }
            if(resp.data === "El cliente no existe"){                            
                    Swal.fire({
                        title: "Cliente no encontrado!!",
                        text: "Se debe dar de alta el Cliente!!",                
                        icon: "error"
                    });
                dispatch({type:resetCliente});
            } */
    }
}
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
export function editaCliente(data){
    return async function(dispatch){
        const resp = await axios.put(`${local}/clientes/modificaCliente/${data._id}`, data);
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
//busca por nombre
export function buscaProdPorNombre(nombre) {
    return async function(dispatch){
        const resp = await axios.get(`${local}/productos?nombre=${nombre}`);
        dispatch({type: BUSCA_PRODUCTO_POR_NOMBRE, payload: resp.data});
    }
}
//elimina prod
export function eliminaProducto(_id){
    return async function(dispatch){
        const resp = await axios.delete(`${local}/productos/${_id}`);
        dispatch({type: ELIMINA_PRODUCTO, payload: resp.data});
    }
}

//--proveedores-----------------------------------------------------
//trae proveedores
export function getAllProveedores() { 
    return async function(dispatch){
        const resp = await axios.get(`${local}/proveedores`);
        dispatch({type: GET_ALL_PROVEEDORES, payload:resp.data});
    }
}
//busca x ID
export function buscaProveedor(data) {
    return async function(dispatch){
        const resp = await axios.get(`${local}/proveedores/buscaPorNombre?nombre=${data.nombre}&apellido=${data.apellido}`);
        dispatch({type: BUSCA_PROVEEDOR_POR_NOMBRE_APELLIDO, payload: resp.data});
    }
} 
//crea prov
export function creaProveedor(data){
    return async function(dispatch){
        const resp = await axios.post(`${local}/proveedores`, data);
        dispatch({type:CREA_PROVEEDOR, payload:resp.data});
    }
}
//modifica proveedor
export function modificaProveedor(data){
    return async function(dispatch){
        await axios.put(`${local}/proveedores/modificaProveedor/${data._id}`, data);
    }
}
//elimina
export function eliminaProveedor(_id){
    return async function(dispatch){
        await axios.delete(`${local}/proveedores/${_id}`);
    }    
}

//--remitos-----------------------------------------------------
//trae remitos
export function getAllRemitos(estado){
    return async function(dispatch){
        const resp = await axios.get(`${local}/remitos?estado=${estado}`);
        dispatch({type: GET_ALL_REMITOS, payload: resp.data})
    }
}
//trae último remito ppara obt su num
export function traeUltimoRemito(){
    return async function(dispatch){
        const resp = await axios.get(`${local}/remitos/ultimoRemito`);
        dispatch({type: ULTIMO_REMITO, payload: resp.data});
    }
}
//crea remito
export function creaRemito(data){
    return async function(dispatch){
        const resp = await axios.post(`${local}/remitos`, data); 
        dispatch({type: CREA_REMITO, payload: resp.data});
        if(resp.data.numRemito){
            Swal.fire({
                title: 'Creado con exito !!',
                icon: 'success'
            })
        }else{
            Swal.fire({
                title: 'Algo salió mal !!',
                icon: 'error'
            })
        }
    }
}
//trae remitos de un cliente
export function getRemitosCliente(cuit, estado){
    return async function(dispatch){ 
        const resp = await axios.get(`${local}/remitos/remitosCliente/${cuit}?estado=${estado}`);
        dispatch({type: GET_REMITOS_CLIENTE, payload:resp.data});
    }
}
//tre remito por ID
export function getRemitoById(_id){
    return async function(dispatch){
        const resp = await axios.get(`${local}/remitos/remitoId/${_id}`);
        dispatch({type: GET_REMITO_BY_ID, payload:resp.data});
    }
}
//modifica remito
export function modificaRemito(_id, data){
    return async function(){
        await axios.put(`${local}/remitos/modificaRemito/${_id}`, data);
    }
}

