import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FaTimes, FaQuestion, FaFlag } from 'react-icons/fa';

import Menu from '../components/menu';
import Cabecalho from '../components/cabecalho';
import Rodape from '../components/rodape';
import InputPesquisa from '../components/input-pesquisa';
import Placeholder from '../components/placeholder';
import api from '../services/api';
import { UsuarioContext } from '../contexts/usuarioContext';

type Time = {
    id: number,
    nome: string,
    logo: string
}

export default function Times() {

    const { usuarioLogado } = useContext(UsuarioContext);

    const [ pesquisa, setPesquisa ] = useState('');
    const [ times, setTimes ] = useState<Time[]>([]);
    const [ show, setShow ] = useState(false);
    const [ reSearchActive, setReSearchActive ] = useState(false);

    const [ nome, setNome ] = useState('');
    const [ logo, setLogo ] = useState<File[]>([]);
    const [ previewLogo, setPreviewLogo ] = useState('');

    useEffect(() => {
        api.get(`/times/${pesquisa}`).then(res => {
            setTimes(res.data);
            setReSearchActive(false);
        })
    }, [pesquisa, reSearchActive]);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        
        let usuarioTime

        await api.get(`/usuario/${usuarioLogado.steamId}`).then(res => {
            usuarioTime = res.data.time
        })

        if(usuarioTime == ''){
            alert('Não foi possível criar o time! O jogador já está participando de um time!');
            setLogo([]);
            setNome('');
            setPreviewLogo('');
            setReSearchActive(true);
            handleClose();
            return;
        }

        if(nome === ''){
            alert('É preciso preencher o campo nome antes de realizar o envio!');
            return;
        }

        const data = new FormData();

        data.append('liderId', usuarioLogado.steamId);
        data.append('nome', nome);
        data.append('logo', logo[0]);

        try {
            await api.post("/time", data).then(res => {
                alert(res.data);
            });

            setLogo([]);
            setNome('');
            setPreviewLogo('');
            setReSearchActive(true);
            handleClose();
        } catch {
            alert('Não foi possível realizar a criação do time!');

            setLogo([]);
            setNome('');
            setPreviewLogo('');
            handleClose();
        }
    }

    
    function handleSelectImage(event: ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return;
        }
    
        const selectedLogo = Array.from(event.target.files);

        setLogo(selectedLogo);
    
        const selectedlogoPreview = selectedLogo.map(logo => {
            return URL.createObjectURL(logo);
        }).concat(previewLogo);
    
        setPreviewLogo(selectedlogoPreview[0]);
    }

    function handleRemoveImage() {
      
        setPreviewLogo('');
        setLogo([]);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderLista() {
        if(times.length !== 0) {
            return (
                <ul className='time-lista'>
                    {times.map(time => {
                        return (
                            <li className="time-lista-item" key={time.id}>
                                <Link to={`/TimePerfil/${time.id}`}>
                                        {time.logo == '' ? 
                                            <div className='imageless'>
                                                <FaQuestion/>
                                            </div> : 
                                            <img src={time.logo} alt="logo"/>
                                        }
                                    <h2>{time.nome}</h2>
                                </Link>
                            </li>
                        )
                    }).reverse()}
                </ul>
            )
        } else {
            return (
                <Placeholder texto='Nenhum time foi encontrado no sistema!'/>
            )
        }
    }

    return (
        <div>
            <Menu/>
            <div className="container"> 
                <Cabecalho titulo='Times' links={[{url: '/', titulo: 'Home'}, {url: '/Times', titulo: 'Times'}]} />

                <div className="times-opcoes">
                    <InputPesquisa value={pesquisa} 
                        setValue={setPesquisa} height='6rem' inputWidth='63rem' 
                        buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>

                    <button className='butao-criar' onClick={handleShow}>
                        {usuarioLogado.steamId == '0' 
                            ? <Link to='Login'>Criar time +</Link> 
                            : 'Criar time +'}
                    </button>
                </div>

                {renderLista()}
                       
            </div>
            <Rodape/>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Criar Time</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="time-form">
                        <form>
                            <label htmlFor="imagens">Icone do time</label>
                            <div className="imagens">
                                {previewLogo == '' ? 
                                    <div>
                                        <label htmlFor='image[]' className="new-image">
                                            <FaFlag size={54} color="#15b6d6" />
                                        </label> 
                                        <input onChange={handleSelectImage} accept="image/*" type="file" id="image[]"/>
                                    </div> :  
                                    <div className="image-area" key={previewLogo}>
                                        <img src={previewLogo} alt='imagem'/>
                                        <button className='excluir-logo' type='button' onClick={handleRemoveImage}>
                                            <h1><FaTimes/></h1>
                                        </button>
                                    </div>
                                }
                            </div>     

                            <label htmlFor="titulo">Nome do time</label>
                            <input onChange={event => setNome(event.target.value)} type="text" name='nome' id='nome'/>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='botao-enviar' onClick={handleSubmit}>Enviar</button>
                    <button className='botao-resetar' onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}