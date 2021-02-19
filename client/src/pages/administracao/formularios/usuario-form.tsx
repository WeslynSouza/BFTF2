import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import * as Classes from '../../../assets/assets';

type usuarioForm = {
    functionVoltar: Function
}

export default function UsuarioForm({ functionVoltar }: usuarioForm) {

    const history = useHistory();

    const [ nome, setNome ] = useState('');
    const [ steamId, setSteamId ] = useState('');
    const [ avatar, setAvatar ] = useState<File[]>([]);
    const [ elegivel, setElegivel ] = useState('');
    const [ classes, setClasses ] = useState<string[]>([]);

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        data.append('nome', nome);
        data.append('steamId', steamId);
        avatar.forEach(avatar => {
            data.append('avatar', avatar);
        })
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
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value={nome} placeholder='Nome' 
                        id='nome' onChange={event => setNome(event.target.value)}/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="steamId">SteamId</label>
                    <input type="text" value={steamId} placeholder='SteamId' id='steamId' readOnly/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="text" value='Nome Imagem' id='avatar'/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="elegivel">Elegivel</label>
                    <select name="elegivel" id="elegivel" value={elegivel} onChange={event => setElegivel(event.target.value)}>
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
                    <button className="botao-voltar" onClick={() => functionVoltar('tabela')}>
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}