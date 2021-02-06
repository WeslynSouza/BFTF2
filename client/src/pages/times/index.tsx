import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { FaSearch } from 'react-icons/fa';

import './style.css';

import logo from '../../assets/perfilPaula.jpg';

export default function Times() {
    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo='Times' links={[{url: '/', titulo: 'Home'}, {url: '/Times', titulo: 'Times'}]} />

            <div className="times-opcoes">
                <div className="input-grupo">
                    <input type="text" placeholder="Pesquisar..."/>
                    <button>
                        <FaSearch/>
                    </button>
                </div>

                <button className='butao-criar'>Criar Time +</button>
            </div>

            <ul className="time-lista">
                <li className="time-lista-item">
                    <img src={logo} alt="logo"/>
                    <h2>Time nome</h2>
                </li>
                <li className="time-lista-item">
                    <img src={logo} alt="logo"/>
                    <h2>Time nome</h2>
                </li>
                <li className="time-lista-item">
                    <img src={logo} alt="logo"/>
                    <h2>Time nome</h2>
                </li>
                <li className="time-lista-item">
                    <img src={logo} alt="logo"/>
                    <h2>Time nome</h2>
                </li>
                <li className="time-lista-item">
                    <img src={logo} alt="logo"/>
                    <h2>Time nome</h2>
                </li>
            </ul>
        </div>
    )
}