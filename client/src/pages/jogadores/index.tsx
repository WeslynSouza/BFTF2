import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import InputPesquisa from '../../components/input-pesquisa';
import { FaPlus } from 'react-icons/fa';


import img from '../../assets/perfilPaula.jpg';

import './style.css';

export default function Jogadores() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo="Jogadores" links={[
                    {url: '/', titulo: 'Home'}, 
                    {url: '/Times', titulo: 'Times'}, 
                    {url: '/TimePerfil', titulo: 'Perfil'}, 
                    {url: '/Jogadores', titulo: 'Jogadores'}]} />


                <div className="jogadores-opcoes">
                    <InputPesquisa value={pesquisa} 
                        setValue={setPesquisa} height='6rem' inputWidth='97rem' 
                        buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>
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
        </div>
    )
}