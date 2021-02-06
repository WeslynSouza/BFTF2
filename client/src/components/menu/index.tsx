import { FaRegUserCircle, FaRegBell, FaCogs } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

import './styles.css';

export default function Menu() {
    return (
        <div>
            <div className="cabecalho">
                <ul className="menu">
                    <li className="menu-item">
                        <Link to='/'>
                            <img src={Logo} alt="Logo" className="logo"/>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to='/Noticias'>
                            Notícias
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to='/Times'>
                            Times
                        </Link>
                    </li>
                    <li className="menu-item">Divisões</li>
                </ul>

                <ul className="menu-icon">
                    <li className="menu-item">
                        <FaRegUserCircle/>
                    </li>
                    <li className="menu-item">
                        <FaRegBell/>
                    </li>
                    <li className="menu-item">
                        <FaCogs/>
                    </li>
                </ul>
            </div>
        </div>
    )
}