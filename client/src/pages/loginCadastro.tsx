import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FaArrowRight, FaEyeSlash, FaSteam } from 'react-icons/fa';

import { UsuarioContext } from '../contexts/usuarioContext';
import IndexedDb from '../utils/indexedDB';
import logo from '../assets/logo.svg';
import api from '../services/api';

export default function LoginCadastro() {

    const { userLogin } = useContext(UsuarioContext);
    const history = useHistory();

    const indexedDb = new IndexedDb('BrasilFortress');
    const $html = document.querySelector('html');

    const [ isLogin, setIsLogin ] = useState(true);
    const [ senhaVisivel, setSenhaVisivel ] = useState(false);
    const [ confirmarSenhaVisivel, setConfirmarSenhaVisivel ] = useState(false);

    const [ steamId, setSteamId ] = useState('');
    const [ nick, setNick ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ confirmarSenha, setConfirmarSenha ] = useState('');

    useEffect(() => {
        setIsLogin(true);
    },[]);

    async function connection() {
        await indexedDb.createObjectStore(['config']);
        const retorno = await indexedDb.getValue('config', 'theme');
        if(retorno === undefined || ''){
            await indexedDb.putValue('config', {modoDark: 'on'}, 'theme');
        }else{
            if(retorno.modoDark === 'off'){
                $html?.classList.add('modo-dark');
            }
        }
    }
    connection();

    async function handleSubmit(){
        if(isLogin){
            if(!nick || !senha){
                alert('Favor preencher todos os campos para realizar o login!');
                return;
            }

            const loginData = {
                nick,
                senha
            }

            await api.post("usuarioLogin", loginData)
                .then(res => {
                    userLogin(res.data.steamId);

                    alert(`Bem vindo ${res.data.nick}!`);
                    resetarLogin();
                    history.goBack();
                    return;
                }).catch(err => {
                    alert(err.response.data.errors);
                    resetarLogin();
                    return;
                })

        }else{
            if(!steamId || !nick || !senha || !confirmarSenha){
                alert('Favor preencher todos os campos para realizar o login!');
                return;
            } else if(senha !== confirmarSenha){
                alert('As senhas não conferem!');
                return;
            }

            const data = new FormData();
            data.append('steamId', steamId);
            data.append('nick', nick);
            data.append('senha', senha);

            await api.post('usuario', data).then(res => {
                alert(res.data);
            });

            resetarLogin();
        }
    }

    function resetarLogin() {
        setIsLogin(true);
        setSteamId('');
        setNick('');
        setSenha('');
        setConfirmarSenha('');
    }

    return (
        <div className='login-container'>
            <img src={logo} alt="logo" />

            <div className="login-box">
                <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>

                <fieldset className={`${isLogin && 'input-inativo'}`}>
                    <label htmlFor="steamId">SteamId:</label>
                    <input 
                        type="text" 
                        id="steamId" 
                        value={steamId} 
                        onChange={e => setSteamId(e.target.value)}/>
                </fieldset>

                <fieldset >
                    <label htmlFor="nick">Nick:</label>
                    <input 
                        type="text" 
                        id="nick"
                        value={nick}
                        onChange={e => setNick(e.target.value)}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="senha">Senha:</label>
                    <div>
                        <input 
                            type={`${senhaVisivel ? 'text' : 'password'}`} 
                            id="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}/>
                        <FaEyeSlash 
                            className='botao-senha' 
                            onClick={() => { senhaVisivel ? setSenhaVisivel(false) : setSenhaVisivel(true)}}/>
                    </div>
                    {isLogin && <h5>Esqueci minha senha</h5> }
                </fieldset> 

                <fieldset className={`${isLogin && 'input-inativo'}`}>
                    <label htmlFor="confirmarSenha">Confirmar senha:</label>
                    <div>
                        <input 
                            type={`${confirmarSenhaVisivel ? 'text' : 'password'}`} 
                            id="confirmarSenha"
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}/>
                        <FaEyeSlash 
                            className='botao-senha'
                            onClick={() => { confirmarSenhaVisivel ? setConfirmarSenhaVisivel(false) : setConfirmarSenhaVisivel(true)}}/>
                    </div>
                </fieldset>   

                <button 
                    className='botao-concluir'
                    onClick={handleSubmit}>
                    {isLogin ? 'Logar' : 'Cadastar'}
                </button>

                <button className='botao-steam'>
                    <div className='steam-icon'>
                        <FaSteam/>
                    </div>
                    <div className='steam-texto'>
                        {isLogin ? 'Realizar login com steam' : 'Realizar cadastro com steam'}
                    </div>
                </button>

                <div className='altera-form'>
                    <button onClick={() => {isLogin ? setIsLogin(false) : setIsLogin(true)}}>
                        {isLogin ? 'Ainda não possuo um cadastro' : 'Já possuo um cadastro'} <FaArrowRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}