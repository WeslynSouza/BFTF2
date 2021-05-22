import { useContext } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { UsuarioContext } from '../../contexts/usuarioContext';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

import './styles.scss';

export default function Menu() {

    const { usuarioLogado } = useContext(UsuarioContext);

    return (
        <div className='cabecalho'>
            <div className="cabecalho-area">
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
                    <li className="menu-item">
                        <Link to='/Divisoes'>
                            Divisões
                        </Link>
                    </li>
                    {usuarioLogado.acesso !== 0 &&
                        <li className="menu-item">
                            <Link to='/Administracao'>
                                Administração
                            </Link>
                        </li>
                    }
                </ul>

                <ul className="menu-icon">
                    <li className="menu-item">
                        <Link to='/Login'>
                            <FaUserCircle/>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <FaBell/>
                    </li>
                </ul>
            </div>
        </div>
    )
}