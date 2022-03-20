import React, {useState, createContext} from "react"

// Register Modal
export const ModalRegisterContext = createContext()
export const ModalRegisterProvider = ({children}) => {
    const [openModalRegister, setOpenModalRegister] = useState(false)

    return (
        <ModalRegisterContext.Provider value={[openModalRegister, setOpenModalRegister]}>
            {children}
        </ModalRegisterContext.Provider>
    )
}

// Login Modal
export const ModalLoginContext = createContext()
export const ModalLoginProvider = ({children}) => {
    const [openModalLogin, setOpenModalLogin] = useState(false)

    return (
        <ModalLoginContext.Provider value={[openModalLogin, setOpenModalLogin]}>
            {children}
        </ModalLoginContext.Provider>
    )
}

// Login State
export const LoginContext = createContext()
export const LoginContextProvider = ({children}) => {
    const [login, setLogin] = useState(false)

    return (
        <LoginContext.Provider value={[login, setLogin]}>
            {children}
        </LoginContext.Provider>
    )
}