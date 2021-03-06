import { useEffect, useState } from 'react';
import { FaPlus, FaQuestion } from 'react-icons/fa';
import Menu from '../components/menu';
import Cabecalho from '../components/cabecalho';
import Rodape from '../components/rodape';
import InputPesquisa from '../components/input-pesquisa';
import Placeholder from '../components/placeholder';
import api from '../services/api';
import { useHistory, useParams } from 'react-router';

interface Usuario {
    id: number,
    nick: string, 
    avatar: string,
    time: {}
}

interface JogadoresParams {
    timeId: string
}

export default function Jogadores() {

    const params = useParams<JogadoresParams>();
    const history = useHistory();

    const [ pesquisa, setPesquisa ] = useState('');
    const [ jogadores, setJogadores ] = useState<Usuario[]>([]);

    useEffect(() => {
        api.get(`/usuarios/${pesquisa}`).then(res => {
            setJogadores(res.data);
        });
    }, [pesquisa]);

    async function handleAddingPlayer(id: number) {
        await api.put(`/usuario/${id}/${params.timeId}`).then(() => {
            alert('Jogador adicionado com sucesso!');

            history.goBack();
        }).catch(err => {
            alert(err.response.data);
        })
    }

    function renderLista() {
        if(jogadores.find(jogador => jogador.time == '')) {
            return (
                <ul className="jogadores-lista">
                    {jogadores.map(jogador => {

                        if(jogador.time){
                            return ''
                        } 

                        return (
                            <li className="jogadores-lista-item" key={jogador.id}>
                                <div className="jogador-info">
                                    {jogador.avatar == '' ? 
                                        <div className='imageless'>
                                            <FaQuestion/>
                                        </div> : 
                                        <img src={jogador.avatar} alt="avatar"/>
                                    }
                                    <h2>{jogador.nick}</h2>
                                </div>
                                <button onClick={() => handleAddingPlayer(jogador.id)}>
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
                    {url: `/TimePerfil/${params.timeId}`, titulo: 'Perfil'}, 
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