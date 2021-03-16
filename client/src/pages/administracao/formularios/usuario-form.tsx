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
    const [ elegivel, setElegivel ] = useState('');
    const [ classes, setClasses ] = useState<Classe[]>([{ id: 1, nome: ''}]);

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

        const data = new FormData();

        data.append('nick', nick);
        data.append('steamId', steamId);
        data.append('avatar', avatar);
        data.append('elegivel', elegivel);

        alert('Cadastro realizado com sucesso!');

        history.push('/');
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
                    <select name="elegivel" id="elegivel">
                        <option value="nao-elegivel">Não elegivel</option>
                        <option value="elegivel">Elegivel</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="Classes">Classes</label>
                    <div className="botoes-classes">
                        <img src={classeScout} alt="classe"/>
                        <img src={classeSoldier} alt="classe"/>
                        <img src={classePyro} alt="classe"/>
                        <img src={classeDemoman} alt="classe"/>
                        <img src={classeHeavy} alt="classe"/>
                        <img src={classeEngieneer} alt="classe"/>
                        <img src={classeMedic} alt="classe"/>
                        <img src={classeSniper} alt="classe"/>
                        <img src={classeSpy} alt="classe"/>
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