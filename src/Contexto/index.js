import { createContext, useState } from "react";

//--creo contexto---
export const AppContexto = createContext();

//--creo provider - aquí desarrollo estados globales-------------------------
export const AppProvider = ({children}) => {

    //const userLogueado = userLog();
    //estado user logeado
    const [userLog, setUserLog] = useState(null); console.log("data", userLog)
    //estado modal cliente
    const [modalClienteOpen, setModalClienteOpen] = useState(false); 
    //estado modal producto
    const [modalProductoOpen, setModalProductoOpen] = useState(false);
    //estado modal img
    const [modalImgOpen, setModalImgOpen] = useState(false);
    //estadfo modal provee
    const [modalProveedorOpen, setModalProveedorOpen] = useState(false);

    
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
                setModalProveedorOpen
            }}
        >
            {children}
        </AppContexto.Provider>
    )
};
