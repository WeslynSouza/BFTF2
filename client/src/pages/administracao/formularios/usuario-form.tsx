import { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Classes from '../../../assets/assets';
import api from '../../../services/api';

interface Classe {
    id: number;
    nome: string
}

type usuarioForm = {
    usuarioId: string,
    functionVoltar: Function
}

export default function UsuarioForm({ functionVoltar, usuarioId }: usuarioForm) {

    const history = useHistory();

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
            setNick(res.data.nick);
            setSteamId(res.data.steamId);
            setAvatar(res.data.avatar);
            setElegivel(res.data.elegivel);
            setClasses(res.data.classes);
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
    }, [classes])

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

        await api.put(`usuario/${steamId}`, data);

        alert('Cadastro realizado com sucesso!');

        functionVoltar('tabInicial');
    }

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar usuario</h2>
            </div>

            <form className='form-secundary' onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="nick">Nick</label>
                    <input type="text" value={nick} placeholder='Nick' 
                        id='nome' onChange={event => setNick(event.target.value)}/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="steamId">SteamId</label>
                    <input type="text" value={steamId} placeholder='SteamId' id='steamId' readOnly/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="text" value={avatar} id='avatar'/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="elegivel">Elegivel</label>
                    <select name="elegivel" id="elegivel" onChange={event => setElegivel(event.target.value)} value={elegivel}>
                        <option value={0}>Não elegivel</option>
                        <option value={1}>Elegivel</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="Classes">Classes</label>
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
        </div>
    )
}