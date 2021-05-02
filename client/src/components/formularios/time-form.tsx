import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaUserCircle } from 'react-icons/fa';
import api from '../../services/api';

import '../../styles/pages/admTimeForm.scss';

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
    const [ logoTime, setLogoTime ] = useState('');
    const [ jogadoresTime, setJogadoresTime ] = useState<Jogadores[]>([]);
    const [ liderTime, setLiderTime ] = useState<Jogadores>();

    useEffect(() => {
        api.get(`/time/${timeId}`).then(res => {
            const { nome, logo, jogadores, lider } = res.data;

            setNomeTime(nome);
            setLogoTime(logo);
            setJogadoresTime(jogadores);
            setLiderTime(lider);
        })
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event: FormEvent) {
        
    }

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar time</h2>
            </div>

            <form className='timeForm'>

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
                            {jogadoresTime.map(jogador => (
                                <li>
                                    <h4>{jogador.nick}</h4>

                                    <div className="lista-botoes">
                                        <button className="botao-excluir">
                                            <FaTrash/>
                                        </button>
                                    </div>                             
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="botoes-container">
                    <button className="botao-alterar">
                        Alterar
                    </button>
                    <button className="botao-voltar" onClick={() => functionVoltar('tabInicial')}>
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}