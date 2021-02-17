import { FaRegCopyright, FaDiscord, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/logo.svg';

import './style.css';

export default function Rodape() {
    return (
        <div className='rodape'>
            <div className="rodape-conteudo">
                <img src={logo} alt="Logo"/>

                <div className="rodape-sobrenos">
                    <h2>Sobre nós</h2>
                    <p>"A Brasil Fortress é a organização que gerencia a liga brasileira de Team Fortress 2,
                     e sua principal liga é o campeonato 6x6."</p>
                </div>

                <div className="rodape-redeSociais">
                    <h2>Rede Sociais</h2>
                    <div className="rodape-redeSociais-icons">
                        <FaDiscord/>
                        <FaFacebook/>
                        <FaTwitter/>
                        <FaYoutube/>
                    </div>
                </div>
            </div>
            <div className="rodape-copy">
                <FaRegCopyright/>
                <div>2021 Copyright - Brasil Fortress</div>
            </div>
        </div>
    )
}