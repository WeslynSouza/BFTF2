import { useState } from 'react';
import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import InputPesquisa from '../../components/input-pesquisa';
import { Link } from 'react-router-dom';

import './style.css';

import logo from '../../assets/perfilPaula.jpg';

export default function Times() {

    const [ pesquisa, setPesquisa ] = useState('');

    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo='Times' links={[{url: '/', titulo: 'Home'}, {url: '/Times', titulo: 'Times'}]} />

            <div className="times-opcoes">
                <InputPesquisa value={pesquisa} 
                    setValue={setPesquisa} height='6rem' inputWidth='65rem' 
                    buttonWidth='7rem' fontInput='2.5rem' fontButton='3.2rem'/>

                <button className='butao-criar'>Criar time +</button>
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