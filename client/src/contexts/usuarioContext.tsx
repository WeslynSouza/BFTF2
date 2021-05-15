import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface Usuario {
    steamId: string,
    nick: string,
    avatar: string,
    acesso: number
}

interface UsuarioData {
    usuarioLogado: Usuario;
    userLogin: (steamId: string) => void;
    userLogoff: () => void;
}

interface UsuarioProviderProps {
    children: ReactNode;
}

export const UsuarioContext = createContext({} as UsuarioData);

export function UsuarioProvider({children}: UsuarioProviderProps) {

    const usuarioPadrao = {
        steamId: '0',
        nick: '',
        avatar: '',
        acesso: 0
    }

    const [ usuarioLogado, setUsuarioLogado ] = useState<Usuario>(usuarioPadrao);

    function userLogin(steamId: string) {
        api.get(`/usuario/${steamId}`).then(res => {
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