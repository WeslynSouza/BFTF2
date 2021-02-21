import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import InputPesquisa from '../../components/input-pesquisa';
import Placeholder from '../../components/placeholder';
import api from '../../services/api';

import './style.scss';

type Usuario = {
    steamId: number,
    nick: string, 
    avatar: string
}

export default function Jogadores() {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ jogadores, setJogadores ] = useState<Usuario[]>([]);

    useEffect(() => {
        api.get(`/usuarios/${pesquisa}`).then(res => {
            setJogadores(res.data);
        });
    }, [pesquisa]);

    function renderLista() {
        if(jogadores.length !== 0) {
            return (
                <ul className="jogadores-lista">
                    {jogadores.map(jogador => {
                        return (
                            <li className="jogadores-lista-item" key={jogador.steamId}>
                                <div className="jogador-info">
                                    <img src={jogador.avatar} alt="logo"/>
                                    <h2>{jogador.nick}</h2>
                                </div>
                                <button>
                                    <FaPlus/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )
        } else {
            return (
                <Placeholder texto='Nenhum jogador foi encontrado no sistema!'/>
            )
        }
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo="Jogadores" links={[
                    {url: '/', titulo: 'Home'}, 
                    {url: '/Times', titulo: 'Times'}, 
                    {url: '/TimePerfil', titulo: 'Perfil'}, 
                    {url: '/Jogadores', titulo: 'Jogadores'}]} />


                <div className="jogadores-opcoes">
                    <InputPesquisa value={pesquisa} 
                        setValue={setPesquisa} height='6rem' inputWidth='97rem' 
                        buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>
                </div>

                {renderLista()}
            </div>
            <Rodape/>
        </div>
    )
}