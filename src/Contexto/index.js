import { createContext, useEffect, useState } from "react";
import { userLogData } from "../LocalStorage";

//--creo contexto---
export const AppContexto = createContext();

//--creo provider - aquí desarrollo estados globales-------------------------
export const AppProvider = ({children}) => {

    //const userLogueado = userLog();
    //estado user logeado
    const [userLog, setUserLog] = useState(null); 
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
    //estado para el SEARCH
    const [search, setSearch] = useState(''); 

    useEffect(()=>{
        const userLogin = userLogData();
        if(userLogin){
            setUserLog(userLogin);
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
                search,
                setSearch,
            }}
        >
            {children}
        </AppContexto.Provider>
    )
};
