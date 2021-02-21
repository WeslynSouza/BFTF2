import { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Classes from '../../../assets/assets';
import api from '../../../services/api';

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
    const [ classes, setClasses ] = useState<string[]>([]);

    useEffect(() => {
        api.get(`/usuario/${usuarioId}`).then(res => {
            setNick(res.data.nick);
            setSteamId(res.data.steamId);
            setAvatar(res.data.avatar);
            setElegivel(res.data.elegivel);
            setClasses(res.data.classes);
        })
    }, [])

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        data.append('nick', nick);
        data.append('steamId', steamId);
        data.append('avatar', avatar);
        data.append('elegivel', elegivel);
        classes.forEach(classe => {
            data.append('classes', classe);
        })

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
                        <img src={Classes.demoman} alt="classe"/>
                        <img src={Classes.spy} alt="classe"/>
                        <img src={Classes.engieneer} alt="classe"/>
                        <img src={Classes.soldier} alt="classe"/>
                        <img src={Classes.medic} alt="classe"/>
                        <img src={Classes.heavy} alt="classe"/>
                        <img src={Classes.sniper} alt="classe"/>
                        <img src={Classes.scout} alt="classe"/>
                        <img src={Classes.pyro} alt="classe"/>
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