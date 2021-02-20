import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Table } from 'react-bootstrap';

import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import * as Classes from '../../assets/assets';

import './style.scss';
import api from '../../services/api';

type TimeParams = {
    id: string
}

type Jogador = {
    nick: string,
    avatar: string,
}

type Time = {
    nome: string,
    logo: string,
    divisao: string,
    jogadores: Array<Jogador>
}

export default function TimePerfil() {

    const params = useParams<TimeParams>();
    const [ time, setTime ] = useState<Time>(Object);

    useEffect(() => {
        api.get(`/Time/${params.id}`).then(res => {
            setTime(res.data);
        })
    }, [params.id])

    function renderTabela() {
        if(time.nome === undefined){
            return '';
        }
        return (
            time.jogadores.map(jogador => {
                return (
                    <tr key={jogador.nick}>
                        <td>
                            <img src={jogador.avatar} alt="Avatar"/>
                            {jogador.nick}
                        </td>
                        <td>
                            <div>
                                <img src={Classes.scout} alt="classe"/>
                                <img src={Classes.soldierBlue} alt="classe"/>
                                <img src={Classes.pyro} alt="classe"/>
                                <img src={Classes.demoman} alt="classe"/>
                                <img src={Classes.heavyBlue} alt="classe"/>
                                <img src={Classes.engieneer} alt="classe"/>
                                <img src={Classes.sniper} alt="classe"/>
                                <img src={Classes.medic} alt="classe"/>
                                <img src={Classes.spy} alt="classe"/>
                            </div>
                        </td>
                        <td>
                            <button className='botao-excluir'>
                                <FaTimes/>
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo="Time perfil" links={[{titulo: 'Home', url:'/'}, {titulo: 'Times', url: '/Times'}, {titulo: 'Perfil', url: '/TimePerfil'}]} />

                <div className="time-container">
                    <div className="time-infos">
                        <img src={time.logo} alt="Logo"/>
                        <h2>Nome: {time.nome}</h2>
                        <h2>{time.divisao === '' ? 'Sem divisao' : `Divisao: ${time.divisao}`}</h2>
                    </div>

                    <div className="time-conteudo">
                        <div className="time-conteudo-cabecalho">
                            <h2>Jogadores</h2>
                            <Link to='/Jogadores'>                            
                                <button type='button'>
                                    Adicionar jogador <FaPlus/>
                                </button>
                            </Link>
                        </div>
                        
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Classe</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTabela()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )
}