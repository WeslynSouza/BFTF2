import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { FaSearch, FaPlus } from 'react-icons/fa';

import img from '../../assets/perfilPaula.jpg';

import './style.css';

export default function Jogadores() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div className="container">

            <Menu/>
            <Cabecalho titulo="Jogadores" links={[
                {url: '/', titulo: 'Home'}, 
                {url: '/Time', titulo: 'Times'}, 
                {url: '/TimePerfil', titulo: 'Perfil'}, 
                {url: '/Jogadores', titulo: 'Jogadores'}]} />


            <div className="jogadores-opcoes">
                <div className="input-grupo">
                    <input onChange={event => setPesquisa(event.target.value)} type="text" value={pesquisa} placeholder="Pesquisar..."/>
                    <button>
                        <FaSearch/>
                    </button>
                </div>
            </div>

            <ul className="jogadores-lista">
                <li className="jogadores-lista-item">
                    <div className="jogador-info">
                        <img src={img} alt="logo"/>
                        <h2>Jogadores nome</h2>
                    </div>
                    <button>
                        <FaPlus/>
                    </button>
                </li>
                <li className="jogadores-lista-item">
                    <div className="jogador-info">
                        <img src={img} alt="logo"/>
                        <h2>Jogadores nome</h2>
                    </div>
                    <button>
                        <FaPlus/>
                    </button>
                </li>
                <li className="jogadores-lista-item">
                    <div className="jogador-info">
                        <img src={img} alt="logo"/>
                        <h2>Jogadores nome</h2>
                    </div>
                    <button>
                        <FaPlus/>
                    </button>
                </li>
                <li className="jogadores-lista-item">
                    <div className="jogador-info">
                        <img src={img} alt="logo"/>
                        <h2>Jogadores nome</h2>
                    </div>
                    <button>
                        <FaPlus/>
                    </button>
                </li>
                <li className="jogadores-lista-item">
                    <div className="jogador-info">
                        <img src={img} alt="logo"/>
                        <h2>Jogadores nome</h2>
                    </div>
                    <button>
                        <FaPlus/>
                    </button>
                </li>
            </ul>
        </div>
    )
}