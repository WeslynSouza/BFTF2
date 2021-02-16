import * as Classes from '../../../assets/assets';

type usuarioForm = {
    functionVoltar: Function
}

export default function UsuarioForm({ functionVoltar }: usuarioForm) {

    return (
        <div className="administracao-tab-container">
            <div className="tab-header">
                <h2>Alterar usuario</h2>
            </div>

            <form>
                <fieldset>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value='Nome' id='nome'/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="steamId">SteamId</label>
                    <input type="text" value='12893781273' id='steamId' readOnly/>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="text" value='Nome Imagem' id='avatar'/>
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
                    <button className="botao-voltar" onClick={() => functionVoltar('tabela')}>
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}