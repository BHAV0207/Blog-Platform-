import React ,  {createContext,useState} from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [isOpen ,setIsOpen] = useState(false);

    const modalTrigger = () => {
        setIsOpen(!isOpen);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        <ModalContext.Provider value={{isOpen , modalTrigger , closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}



