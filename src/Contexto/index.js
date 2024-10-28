import { createContext, useEffect, useState } from "react";
import { userLogData } from "../LocalStorage";

//--creo contexto---
export const AppContexto = createContext();

//--creo provider - aquí desarrollo estados globales-------------------------
export const AppProvider = ({children}) => {

    //const userLogueado = userLog();
    //estado user logeado
    const [userLog, setUserLog] = useState(null); 
    //estado nombreUser
    const [nombre, setNombre] = useState();
    //estado para login
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //estado modal cliente
    const [modalClienteOpen, setModalClienteOpen] = useState(false); 
    //estado modal producto
    const [modalProductoOpen, setModalProductoOpen] = useState(false);
    //estado modal img
    const [modalImgOpen, setModalImgOpen] = useState(false);
    //estadfo modal provee
    const [modalProveedorOpen, setModalProveedorOpen] = useState(false);
    //estado modal detalle remito
    const[modalRemito, setModalRemito] = useState(false);
    //estado modal entrega cliente
    const[modalEntregaCliente, setModalEntregaCliente] = useState(false);
    //estado modal edita entrega 
    const[modalEditaEntrega, setModalEditaEntrega] = useState(false);
    //estado modal modif Gasto
    const[modalModifGasto, setModalModifGasto] = useState(false);
    //estado para el SEARCH
    const [search, setSearch] = useState(''); 

    const login = () => {
        setIsAuthenticated(true);
    };
    const logout = () => {
        setIsAuthenticated(false);
    };
    /* efecto para el loguin */
    useEffect(()=>{
        const userLogin = userLogData(); 
        if(userLogin){
            setUserLog(userLogin);
            setIsAuthenticated(true);
            setNombre(userLogin.user?.nombre)
        }
    }, []);
    
    return(
        <AppContexto.Provider 
            value={{
                userLog,
                setUserLog,
                modalClienteOpen,
                setModalClienteOpen,
                modalProductoOpen,
                setModalProductoOpen,
                modalImgOpen,
                setModalImgOpen,
                modalProveedorOpen,
                setModalProveedorOpen,
                modalRemito,
                setModalRemito,
                modalEntregaCliente,
                setModalEntregaCliente,
                modalEditaEntrega,
                setModalEditaEntrega,
                modalModifGasto,
                setModalModifGasto,
                search,
                setSearch,
                isAuthenticated,
                login,
                logout,
                nombre,
            }}
        >
            {children}
        </AppContexto.Provider>
    )
};
