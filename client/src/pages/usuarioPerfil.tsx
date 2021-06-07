import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPen, FaSteam, FaTimes, FaQuestion, FaUser } from 'react-icons/fa';

import { UsuarioContext } from '../contexts/usuarioContext';
import Cabecalho from "../components/cabecalho";
import Menu from "../components/menu";
import Rodape from "../components/rodape";
import api from '../services/api';

interface Usuario {
    id: number,
    nick: string,
    avatar: string,
    time?: {
        id: number,
        nome: string,
        logo: string,
    }
    steamId?: string,
    atividades: {
        id: number,
        tipo: number,
        data: string,
        nomeTime?: string
    }[]
}

export default function UsuarioPerfil() {

    const { usuarioLogado } = useContext(UsuarioContext);
    const [usuario, setUsuario] = useState<Usuario>({
        id: 1,
        nick: '',
        avatar: '',
        atividades: [{
            id: 1,
            tipo: 1,
            data: '',
        }]
    })

    useEffect(() => {
        api.get(`usuario/${usuarioLogado.id}`).then(res => {
            setUsuario(res.data);
        })
    }, [])

    function renderTime() {
        if(usuario.time){
            return(
                <div className="usuario-time">          
                    {usuario.time.logo == ''
                        ?   <div className='imageless'>
                                <FaQuestion/>
                            </div>
                        :   <Link to={`timePerfil/${usuario.time.id}`} className="link-img">
                                <img src={usuario.time.logo} alt="logo do time" />
                            </Link>
                    }               

                    <div className="usuario-time-info">
                        <h1>Nome: {usuario.time.nome}</h1>
                    </div>

                    <button className="deixar-time">
                        <div>Deixar time</div> <FaTimes/>
                    </button>

                    <Link to={`timePerfil/${usuario.time.id}`} className="link-pagina-time">
                        <div>Ir para página do time</div> <FaArrowRight/>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="usuario-time">
                    <h3>O usuario não faz parte de um time.</h3>
                </div>
            )
        }
    }

    function renderSteam() {
        if(usuario.steamId){
            return (
                <div className="usuario-steam">
                    <h3>Conta vinculada a steam</h3>
                    <h3><FaSteam className='steam-icon'/> <Link to='#'>5456465456</Link> / 546545646 / 4564654</h3>
                </div>
            )
        } else {
            return (
                <div className="usuario-steam">
                    <h3>Conta não vinculada a steam</h3>
                </div> 
            )
        }
    }

    function renderAtividades() {
        return (
            <div className="usuario-atividades">
                {usuario.atividades.sort(
                    (a, b) => {
                        if(a.id > b.id){
                            return 1;
                        }
                        if(a.id < b.id){
                            return -1;
                        }
                        return 0;
                    }
                ).map(atividade => {
                    switch(atividade.tipo){
                        case 1:
                            return <h3 key={atividade.id}>Conta criada em: {atividade.data}</h3>
                        case 2:
                            return <h3 key={atividade.id}>Entrou no time {atividade.nomeTime} do time no dia: {atividade.data}</h3>
                        case 3:
                            return <h3 key={atividade.id}>Deixou o time {atividade.nomeTime} do time no dia: {atividade.data}</h3>
                    }
                })}
            </div>
        )
    }

    return (
        <div>
            <Menu/>
            <div className='container'>
                <Cabecalho titulo="Perfil" links={[{titulo: 'Home', url:'/'}, {titulo: 'Perfil', url: '/UsuarioPerfil'}]}/>

                <div className="usuario-container">
                    <div className="usuario-info">
                        {usuario.avatar == '' 
                        ?   <div className='usuario-sem-imagem'>
                                <FaUser size={54} color="#15b6d6" />
                            </div>  
                        :   <img src={usuario.avatar} alt="avatar" />
                        }


                        <h2>{usuario.nick}</h2>
                    </div>

                    <div className="usuario-conteudo">

                        <button className="alterar-infos">
                            <div>Alterar informações</div> <FaPen/>
                        </button>

                        <div className="usuario-conteudo-grupo">
                            <h2 className='usuario-conteudo-titulo'>Time atual</h2>
                            
                            {renderTime()}
                        </div>

                        <div className="usuario-conteudo-grupo">
                            <h2 className='usuario-conteudo-titulo'>Steam</h2>

                            {renderSteam()}
                        </div>

                        <div className="usuario-conteudo-grupo">
                            <h2 className='usuario-conteudo-titulo'>Atividades</h2>

                            {renderAtividades()}
                        </div>
                    </div>
                </div>
            </div>
            <Rodape/>
        </div>
    )

}