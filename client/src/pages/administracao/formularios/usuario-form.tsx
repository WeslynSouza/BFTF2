import { useState } from 'react';
import * as Classes from '../../../assets/assets';

export default function UsuarioForm() {

    const [ demoman, setDemoman ] = useState(Classes.demoman);
    const [ spy, setSpy ] = useState(Classes.spy);
    const [ engieneer, setEngieneer ] = useState(Classes.engieneer);
    const [ soldier, setSoldier ] = useState(Classes.soldier);
    const [ medic, setMedic ] = useState(Classes.medic);
    const [ heavy, setHeavy ] = useState(Classes.heavy);
    const [ sniper, setSniper ] = useState(Classes.sniper);
    const [ scout, setScout ] = useState(Classes.scout);
    const [ pyro, setPyro ] = useState(Classes.pyro);

    function handleSelecionarClasse(classe: string) {
        switch(classe){
            case 'demoman': 
                if(demoman === Classes.demoman)
                    setDemoman(Classes.demomanBlue);
                else
                    setDemoman(Classes.demoman);
            break;
            case 'spy': 
                if(spy === Classes.spy)
                    setSpy(Classes.spyBlue);
                else    
                    setSpy(Classes.spy);
            break;
            case 'engieneer': 
                if(engieneer === Classes.engieneer)
                    setEngieneer(Classes.engieneerBlue);
                else 
                    setEngieneer(Classes.engieneer);
            break;
            case 'soldier': 
                if(soldier === Classes.soldier)
                    setSoldier(Classes.soldierBlue);
                else
                    setSoldier(Classes.soldier);
            break;
            case 'medic': 
                if(medic === Classes.medic)
                    setMedic(Classes.medicBlue);
                else
                    setMedic(Classes.medic);
            break;
            case 'heavy': 
                if(heavy === Classes.heavy)
                    setHeavy(Classes.heavyBlue);
                else 
                    setHeavy(Classes.heavy);
            break;
            case 'sniper': 
                if(sniper === Classes.sniper)
                    setSniper(Classes.sniperBlue);
                else
                    setSniper(Classes.sniper)
            break;
            case 'scout': 
                if(scout === Classes.scout)
                    setScout(Classes.scoutBlue);
                else
                    setScout(Classes.scout);
            break;
            case 'pyro': 
                if(pyro === Classes.pyro)
                    setPyro(Classes.pyroBlue);
                else 
                    setPyro(Classes.pyro);
            break;
        }
    }

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
                    <input type="text" value='12893781273' id='steamId'/>
                </fieldset>

                <fieldset>
                    <label htmlFor="senha">Senha</label>
                    <input type="text" value='1283712937' id='senha'/>
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
                        <img src={demoman} alt="classe" onClick={() => handleSelecionarClasse('demoman')}/>
                        <img src={spy} alt="classe" onClick={() => handleSelecionarClasse('spy')}/>
                        <img src={engieneer} alt="classe" onClick={() => handleSelecionarClasse('engieneer')}/>
                        <img src={soldier} alt="classe" onClick={() => handleSelecionarClasse('soldier')}/>
                        <img src={medic} alt="classe" onClick={() => handleSelecionarClasse('medic')}/>
                        <img src={heavy} alt="classe" onClick={() => handleSelecionarClasse('heavy')}/>
                        <img src={sniper} alt="classe" onClick={() => handleSelecionarClasse('sniper')}/>
                        <img src={scout} alt="classe" onClick={() => handleSelecionarClasse('scout')}/>
                        <img src={pyro} alt="classe" onClick={() => handleSelecionarClasse('pyro')}/>
                    </div>
                </fieldset>

                <div className="botoes-container">
                    <button className="botao-alterar">
                        Alterar
                    </button>
                    <button className="botao-voltar">
                        voltar
                    </button>
                </div>
            </form>
        </div>
    )
}