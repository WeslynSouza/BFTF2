import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import './style.css';

import logo from '../../assets/perfilPaula.jpg';

export default function Times() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo='Times' links={[{url: '/', titulo: 'Home'}, {url: '/Times', titulo: 'Times'}]} />

            <div className="times-opcoes">
                <div className="input-grupo">
                    <input onChange={event  => setPesquisa(event.target.value)} type="text" value={pesquisa} placeholder="Pesquisar..."/>
                    <button>
                        <FaSearch/>
                    </button>
                </div>

                <button className='butao-criar'>Criar Time +</button>
            </div>

            <ul className="time-lista">
                <li className="time-lista-item">
                    <Link to='/TimePerfil'>
                        <img src={logo} alt="logo"/>
                        <h2>Time nome</h2>
                    </Link>
                </li>
                <li className="time-lista-item">
                    <Link to='/TimePerfil'>
                        <img src={logo} alt="logo"/>
                        <h2>Time nome</h2>
                    </Link>
                </li>
                <li className="time-lista-item">
                    <Link to='/TimePerfil'>
                        <img src={logo} alt="logo"/>
                        <h2>Time nome</h2>
                    </Link>
                </li>
                <li className="time-lista-item">
                    <Link to='/TimePerfil'>
                        <img src={logo} alt="logo"/>
                        <h2>Time nome</h2>
                    </Link>
                </li>
                <li className="time-lista-item">
                    <Link to='/TimePerfil'>
                        <img src={logo} alt="logo"/>
                        <h2>Time nome</h2>
                    </Link>
                </li>
            </ul>
        </div>
    )
}