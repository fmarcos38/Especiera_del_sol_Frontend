import { createContext, useState } from "react";

//--creo contexto---
export const AppContexto = createContext();

//--creo provider - aquí desarrollo estados globales-------------------------
export const AppProvider = ({children}) => {

    //estado modal cliente
    const [modalClienteOpen, setModalClienteOpen] = useState(false); 
    const [modalProductoOpen, setModalProductoOpen] = useState(false);
    const [modalImgOpen, setModalImgOpen] = useState(false);

    
    return(
        <AppContexto.Provider 
            value={{
                modalClienteOpen,
                setModalClienteOpen,
                modalProductoOpen,
                setModalProductoOpen,
                modalImgOpen,
                setModalImgOpen,
            }}
        >
            {children}
        </AppContexto.Provider>
    )
};
