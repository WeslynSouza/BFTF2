import { useState, FormEvent, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import * as Classes from '../../assets/assets';
import api from '../../services/api';

import './usuarioForm.scss';

interface Classe {
    id: number;
    nome: string
}

interface usuarioFormProps {
    usuarioId: string;
    functionVoltar: Function;
}

export default function UsuarioForm({ functionVoltar, usuarioId }: usuarioFormProps) {

    const [ show, setShow ] = useState(false);

    const [ nick, setNick ] = useState('');
    const [ steamId, setSteamId ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ elegivel, setElegivel ] = useState('0');
    const [ classes, setClasses ] = useState<Classe[]>([{id: 0, nome: ''}]);

    const [ classeScout, setClasseScout ] = useState(Classes.scout);
    const [ classeSoldier, setClasseSoldier ] = useState(Classes.soldier);
    const [ classePyro, setClassePyro ] = useState(Classes.pyro);
    const [ classeDemoman, setClasseDemoman ] = useState(Classes.demoman);
    const [ classeHeavy, setClasseHeavy ] = useState(Classes.heavy);
    const [ classeEngieneer, setClasseEngieneer ] = useState(Classes.engieneer);
    const [ classeSniper, setClasseSniper ] = useState(Classes.sniper);
    const [ classeMedic, setClasseMedic ] = useState(Classes.medic);
    const [ classeSpy, setClasseSpy ] = useState(Classes.spy);

    useEffect(() => {
        api.get(`/usuario/${usuarioId}`).then(res => {
            const { nick, steamId, avatar, elegivel, classes } = res.data;

            setNick(nick);
            setSteamId(steamId);
            setAvatar(avatar);
            setElegivel(elegivel);
            setClasses(classes);
        })
    }, []);

    useEffect(() => {
        classes.forEach(classe => {
            switch(classe.nome) {
                case 'scout':
                    setClasseScout(Classes.scoutBlue);
                    break;
                case 'soldier':
                    setClasseSoldier(Classes.soldierBlue);
                    break;
                case 'pyro':
                    setClassePyro(Classes.pyroBlue);
                    break;
                case 'demoman':
                    setClasseDemoman(Classes.demomanBlue);
                    break;
                case 'heavy':
                    setClasseHeavy(Classes.heavyBlue);
                    break;
                case 'engieneer':
                    setClasseEngieneer(Classes.engieneerBlue);
                    break;
                case 'sniper':
                    setClasseSniper(Classes.sniperBlue);
                    break;
                case 'medic':
                    setClasseMedic(Classes.medicBlue);
                    break;
                case 'spy':
                    setClasseSpy(Classes.spyBlue);
                    break;
            }
        })
    }, [classes]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const arrayClasses = [classeScout, classeSoldier, classePyro, classeDemoman, classeHeavy, classeEngieneer, classeMedic, classeSniper, classeSpy]

        const data = new FormData();

        data.append('nick', nick);
        data.append('steamId', steamId);
        data.append('avatar', avatar);
        data.append('elegivel', elegivel);
        arrayClasses.forEach(classe => {
            switch(classe) {
                case Classes.scoutBlue: 
                    data.append('classes', '1');
                    break;
                case Classes.soldierBlue:
                    data.append('classes', '2'); 
                    break;
                case Classes.pyroBlue: 
                    data.append('classes', '3');
                    break;
                case Classes.demomanBlue:
                    data.append('classes', '4'); 
                    break;
                case Classes.heavyBlue: 
                    data.append('classes', '5');
                    break;
                case Classes.engieneerBlue:
                    data.append('classes', '6'); 
                    break;
                case Classes.medicBlue:
                    data.append('classes', '7'); 
                    break;
                case Classes.sniperBlue: 
                    data.append('classes', '8');
                    break;
                case Classes.spyBlue:
                    data.append('classes', '9'); 
                    break;
            }
        })

        await api.put(`usuario/${steamId}`, data).then(res => {
            alert(res.data);
        });

        functionVoltar('tabInicial');
    }

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar usuario</h2>
            </div>

            <form className='adm-form-usuario' onSubmit={handleSubmit}>

                <div className='fieldset-group'>
                    <fieldset>
                        <label htmlFor="nick">Nick</label>
                        <input type="text" value={nick} placeholder='Nick' 
                            id='nome' onChange={event => setNick(event.target.value)}/>
                    </fieldset>
                    
                    <fieldset>
                        <label htmlFor="steamId">SteamId</label>
                        <input type="text" value={steamId} placeholder='SteamId' id='steamId' readOnly/>
                    </fieldset>
                </div>

                <div className='form-image'>
                    {avatar == '' ? 
                        <div className='form-image-area'>
                            <FaUserCircle/>
                        </div> : 
                        <div className='form-image-area'>
                            <img src={avatar} alt="Imagem de perfil"/>
                            <div className='form-excluir-imagem' onClick={handleShow}>
                                <h1><FaTimes/></h1>
                                <h3>Excluir imagem do usuário</h3>
                            </div>
                        </div>}
                </div>

                <fieldset>
                    <label htmlFor="elegivel">Senha</label>
                    <input type="password" value="***************" placeholder='SteamId' id='steamId' readOnly/>
                </fieldset>

                <fieldset>
                    <label htmlFor="elegivel">Elegivel</label>
                    <select name="elegivel" id="elegivel" onChange={event => setElegivel(event.target.value)} value={elegivel}>
                        <option value={0}>Não elegivel</option>
                        <option value={1}>Elegivel</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="Classes">Classes <i>(selecione as classes)</i></label>
                    <div className="botoes-classes">
                        <img src={classeScout} 
                            onClick={() => 
                                setClasseScout(classeScout == Classes.scout ? Classes.scoutBlue : Classes.scout)
                            } alt="classe"/>
                        <img src={classeSoldier} 
                            onClick={() => 
                                setClasseSoldier(classeSoldier == Classes.soldier ? Classes.soldierBlue : Classes.soldier)
                            } alt="classe"/>
                        <img src={classePyro} 
                            onClick={() => 
                                setClassePyro(classePyro == Classes.pyro ? Classes.pyroBlue : Classes.pyro)
                            } alt="classe"/>
                        <img src={classeDemoman} 
                            onClick={() => 
                                setClasseDemoman(classeDemoman == Classes.demoman ? Classes.demomanBlue : Classes.demoman)
                            } alt="classe"/>
                        <img src={classeHeavy} 
                            onClick={() => 
                                setClasseHeavy(classeHeavy == Classes.heavy ? Classes.heavyBlue : Classes.heavy)
                            } alt="classe"/>
                        <img src={classeEngieneer} 
                            onClick={() => 
                                setClasseEngieneer(classeEngieneer == Classes.engieneer ? Classes.engieneerBlue : Classes.engieneer)
                            } alt="classe"/>
                        <img src={classeMedic} 
                            onClick={() => 
                                setClasseMedic(classeMedic == Classes.medic ? Classes.medicBlue : Classes.medic)
                            } alt="classe"/>
                        <img src={classeSniper} 
                            onClick={() => 
                                setClasseSniper(classeSniper == Classes.sniper ? Classes.sniperBlue : Classes.sniper)
                            } alt="classe"/>
                        <img src={classeSpy} 
                            onClick={() => 
                                setClasseSpy(classeSpy == Classes.spy ? Classes.spyBlue : Classes.spy)
                            } alt="classe"/>
                    </div>
                </fieldset>

                <div className="botoes-container">
                    <button className="botao-alterar">
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
                <Modal.Body>Deseja excluir o avatar do usuário: {nick}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => [setAvatar(''), handleClose()]}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}