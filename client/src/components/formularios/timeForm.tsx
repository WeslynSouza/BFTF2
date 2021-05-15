import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import { FaTimes, FaTrash, FaUserCircle } from 'react-icons/fa';
import api from '../../services/api';

import './timeForm.scss';

interface timeFormProps {
    timeId: string;
    functionVoltar: Function;
}

interface Jogadores {
    steamId: string;
    nick: string;
    avatar: string;
}

export default function PostForm({ functionVoltar, timeId }: timeFormProps) {

    const [ show, setShow ] = useState(false);

    const [ nomeTime, setNomeTime ] = useState('');
    const [ logoTime, setLogoTime ] = useState(' ');
    const [ jogadoresTime, setJogadoresTime ] = useState<Jogadores[]>([]);
    const [ jogadoresAtivo, setJogadoresAtivo ] = useState<Boolean[]>([]);
    const [ liderTime, setLiderTime ] = useState<Jogadores>({
        steamId: '',
        nick: '',
        avatar: ''
    });

    useEffect(() => {
        api.get(`/time/${timeId}`).then(res => {
            const { nome, logo, jogadores, lider } = res.data;
            setNomeTime(nome);
            logoTime == ' ' && setLogoTime(logo);
            setJogadoresTime(jogadores);
            jogadoresAtivo.length == 0 && setJogadoresAtivo(jogadoresTime.map(() => true));
            setLiderTime(lider);
        })
    }, [jogadoresTime]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = new FormData();

        data.append('nome', nomeTime);
        data.append('logo', logoTime);
        data.append('liderId', liderTime.steamId);

        await api.put(`time/${timeId}`, data).then(res => {
            alert(res.data);
        });

        functionVoltar('tabInicial');
    }

    function handleDesativarJogador(indice: number){
        const arrayJogadoresAtivos = jogadoresAtivo
        arrayJogadoresAtivos[indice] = false;
        setJogadoresAtivo(arrayJogadoresAtivos);
        setJogadoresTime(jogadoresTime);
    }

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar time</h2>
            </div>

            <form className='timeForm' onSubmit={handleSubmit}>

                <div className="form-time-area">

                    <div className="form-time-logo-nome">
                        <div className='form-image'>
                            {logoTime == '' ? 
                                <div className='form-image-area'>
                                    <FaUserCircle/>
                                </div> : 
                                <div className='form-image-area'>
                                    <img src={logoTime} alt="Imagem de perfil"/>
                                    <div className='form-excluir-imagem' onClick={handleShow}>
                                        <h1><FaTimes/></h1>
                                        <h3>Excluir imagem do usuário</h3>
                                    </div>
                                </div>}
                        </div>

                        <fieldset>
                            <label htmlFor="">Nome</label>
                            <input type="text" value={nomeTime} placeholder='Nick' 
                                id='nome' onChange={event => setNomeTime(event.target.value)}/>
                        </fieldset>
                    </div>

                    <div className="form-time-lista">
                        <ul>
                            {jogadoresTime.map((jogador, indice) => {
                                return(
                                
                                <li key={indice} className={`${!jogadoresAtivo[indice] && 'jogador-inativo'}`}>
                                    <h4>{jogador.nick}</h4>

                                    <div className='lista-botoes'>
                                        <button 
                                            className="botao-excluir" 
                                            type='button' 
                                            onClick={() => [handleDesativarJogador(indice), console.log(indice)]}>
                                            <FaTrash/>
                                        </button>
                                    </div>                             
                                </li>
                            )})}
                        </ul>
                    </div>

                </div>

                <div className="botoes-container">
                    <button className="botao-alterar" type='submit'>
                        Alterar
                    </button>
                    <button className="botao-voltar" onClick={() => functionVoltar('tabInicial')}>
                        voltar
                    </button>
                </div>
            </form>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja remover a logo do time: {nomeTime}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => [setLogoTime(''), handleClose()]}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}