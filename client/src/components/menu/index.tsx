import { FaRegUserCircle, FaRegBell, FaCogs } from 'react-icons/fa';
import Logo from '../../assets/logo.svg';

import './styles.css';

export default () => {
    return (
        <div>
            <div className="cabecalho">
                <ul className="menu">
                    <li className="menu-item">
                        <img src={Logo} alt="Logo" className="logo"/>
                    </li>
                    <li className="menu-item">Home</li>
                    <li className="menu-item">Forum</li>
                    <li className="menu-item">Times</li>
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