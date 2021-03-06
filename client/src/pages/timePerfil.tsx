import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FaPlus, FaTimes, FaQuestion, FaFlag, FaCrown } from 'react-icons/fa';
import { Table } from 'react-bootstrap';

import Menu from '../components/menu';
import Cabecalho from '../components/cabecalho';
import Rodape from '../components/rodape';
import * as Classes from '../assets/assets';
import { UsuarioContext } from '../contexts/usuarioContext';

import api from '../services/api';

interface TimeParams {
    id: string
}

interface Jogador {
    id: number,
    nick: string,
    avatar: string,
}

interface Time {
    lider: Jogador
    nome: string,
    logo: string,
    divisao: string,
    jogadores: Array<Jogador>
}

export default function TimePerfil() {

    const params = useParams<TimeParams>();
    const { usuarioLogado } = useContext(UsuarioContext);

    const [ time, setTime ] = useState<Time>(Object);
    const [ isReloaded, setIsReloaded ] = useState(false);
    const [ nickJogadorModal, setNickJogadorModal ] = useState('');
    const [ idJogadorModal, setIdJogadorModal ] = useState(0);

    const [ showModalLeadership, setShowModalLeadership ] = useState(false);
    const [ showModalExclusion, setShowModalExclusion ] = useState(false);

    useEffect(() => {
        api.get(`/Time/${params.id}`).then(res => {
            setTime(res.data);
        });

        setIsReloaded(false);
    }, [params.id, isReloaded]);

    function handlePassLeadership(idJogador: number){
        api.put(`/time/${params.id}/${idJogador}`).then(() => {
            alert("A liderança foi passada com sucesso!");

            handleClose();

            setIsReloaded(true);
        }).catch(err => {
            alert(err.response.data);

            handleClose();
        })
    }

    function handleRemovePlayer(idJogador: number){
        api.put(`/usuario-deixarTim/${params.id}/${idJogador}`).then(() => {
            alert("O jogador foi excluído com sucesso!");

            handleClose();

            setIsReloaded(true);
        }).catch(err => {
            alert(err.response.data);

            handleClose();
        })
    };

    const handleClose = () => [setShowModalExclusion(false), setShowModalLeadership(false), setNickJogadorModal(''), setIdJogadorModal(0)];
    const handleShowModalLeadership = () => setShowModalLeadership(true);
    const handleShowModalExclusion = () => setShowModalExclusion(true);

    function renderTabela() {
        if(time.nome === undefined){
            return '';
        }
        return (
            time.jogadores.map(jogador => {

                if(time.lider.id == jogador.id) {
                    return (
                        <tr key={jogador.nick}>
                            <td>
                                <div className='time-jogadores-info'>
                                    {jogador.avatar == '' ? 
                                        <div className='time-jogadores-imageless'>
                                            <FaQuestion/>
                                        </div> : 
                                        <img src={jogador.avatar} alt="avatar"/>
                                    }
                                    {jogador.nick}

                                    <FaCrown className="time-jogador-lider" size={22} color="#FFD700"/>
                                </div>
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
                                <button disabled className='botao-passar-lideranca botao-desabilitado'>
                                    <FaCrown/>
                                </button>
                                <button disabled className='botao-excluir botao-desabilitado'>
                                    <FaTimes/>
                                </button>
                            </td>
                        </tr>
                    )
                }

                return (
                    <tr key={jogador.nick}>
                        <td>
                            <div className='time-jogadores-info'>
                                {jogador.avatar == '' ? 
                                    <div className='time-jogadores-imageless'>
                                        <FaQuestion/>
                                    </div> : 
                                    <img src={jogador.avatar} alt="avatar"/>
                                }
                                {jogador.nick}
                            </div>
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
                            <button 
                                className={`botao-passar-lideranca ${usuarioLogado.id == time.lider.id ? '' : 'botao-desabilitado' }`}
                                disabled={usuarioLogado.id == time.lider.id ? false : true}
                                onClick={() => [
                                    handleShowModalLeadership(), 
                                    setNickJogadorModal(jogador.nick), 
                                    setIdJogadorModal(jogador.id)
                                ]}
                            >
                                <FaCrown/>
                            </button>
                            <button 
                                className={`botao-passar-lideranca ${usuarioLogado.id == time.lider.id ? '' : 'botao-desabilitado' }`}
                                disabled={usuarioLogado.id == time.lider.id ? false : true}
                                onClick={() => [
                                    handleShowModalExclusion(), 
                                    setNickJogadorModal(jogador.nick), 
                                    setIdJogadorModal(jogador.id)
                                ]}
                            >
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
                <Cabecalho titulo="Time perfil" links={[{titulo: 'Home', url:'/'}, {titulo: 'Times', url: '/Times'}, {titulo: 'Perfil', url: `/TimePerfil/${params.id}`}]} />

                <div className="time-container">
                    <div className="time-infos">
                        {time.logo == '' ?
                        <div className='time-sem-imagem'>
                            <FaFlag size={54} color="#15b6d6" />
                        </div> :
                        <img src={time.logo} alt="Logo"/>}
                        
                        <h2>Nome: {time.nome}</h2>
                        <h2>{time.divisao === '' ? 'Sem divisao' : `Divisao: ${time.divisao}`}</h2>
                    </div>

                    <div className="time-conteudo">
                        <div className="time-conteudo-cabecalho">
                            <h2>Jogadores</h2>
                            <Link to={`/Jogadores/${params.id}`}>                            
                                <button type='button'>
                                    Adicionar jogador <FaPlus/>
                                </button>
                            </Link>
                        </div>
                        
                        <div className="time-jogadores-tabela">
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
            </div>
            <Rodape/>

            <Modal show={showModalLeadership} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar passagem <br/>de liderança</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>Deseja passar a liderança para <br/> o jogador: {nickJogadorModal}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => handlePassLeadership(idJogadorModal)}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalExclusion} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>Deseja excluir o jogador: {nickJogadorModal}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => handleRemovePlayer(idJogadorModal)}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}