import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaRegSun, FaMoon } from 'react-icons/fa';

import './style.css';

type CabecalhoProps = {
    titulo: string,
    links: {
        url: string,
        titulo: string
    }[]
}

export default function Cabecalho({ titulo, links }: CabecalhoProps) {

    const [ modoDark, setModoDark ] = useState('on');

    function handleDarkMode() {

        const $html = document.querySelector('html');

        if(modoDark === 'on'){
            setModoDark('off');
            $html?.classList.toggle('modo-dark');
        }else if(modoDark === 'off') {
            setModoDark('on');
            $html?.classList.toggle('modo-dark');
        }
    }

    return (
        <div className="header">
            <h1>{ titulo }</h1>

            <ul className="navegacao">

                <div className={modoDark === 'on' ? 'mododark dark-on' : 'mododark dark-off'}>
                    <button onClick={handleDarkMode} >
                        <FaRegSun className='sun'/>
                        <FaMoon className='moon'/>
                    </button>
                </div>

                {links.map(link => {
                    return (
                        <div key={link.titulo} className='link-area'>
                            <li className="link">
                                <Link to={link.url}>
                                    {link.titulo}
                                </Link>
                            </li>
                            <div className="link-divisao"><FaChevronRight/></div>
                        </div>
                    )
                })}

            </ul>
        </div>
    )
}