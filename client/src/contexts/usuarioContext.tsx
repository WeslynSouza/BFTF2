import { createContext, ReactNode, useState } from "react";
import api from "../services/api";

interface Usuario {
    id: number,
    nick: string,
    avatar: string,
    acesso: number
}

interface UsuarioData {
    usuarioLogado: Usuario;
    userLogin: (id: string) => void;
    userLogoff: () => void;
}

interface UsuarioProviderProps {
    children: ReactNode;
}

export const UsuarioContext = createContext({} as UsuarioData);

export function UsuarioProvider({children}: UsuarioProviderProps) {

    const usuarioPadrao = {
        id: 1,
        nick: '',
        avatar: '',
        acesso: 0
    }

    const [ usuarioLogado, setUsuarioLogado ] = useState<Usuario>(usuarioPadrao);

    function userLogin(id: string) {
        api.get(`/usuario/${id}`).then(res => {
            setUsuarioLogado(res.data);
        })
    }

    function userLogoff() {
        setUsuarioLogado(usuarioPadrao);
    }

    return (
        <UsuarioContext.Provider value={{
            usuarioLogado,
            userLogin,
            userLogoff
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}