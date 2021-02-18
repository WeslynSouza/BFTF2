import { useState } from 'react';
import IndexedDb from '../../utils/indexedDB';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

import './style.scss';

type CabecalhoProps = {
    titulo: string,
    links: {
        url: string,
        titulo: string
    }[]
}

export default function Cabecalho({ titulo, links }: CabecalhoProps) {

    const indexedDb = new IndexedDb('BrasilFortress');
    const $html = document.querySelector('html');

    const [ modoDark, setModoDark ] = useState('on');

    async function connection() {
        await indexedDb.createObjectStore(['config']);
        const retorno = await indexedDb.getValue('config', 'theme');
        if(retorno === undefined || ''){
            await indexedDb.putValue('config', {modoDark: 'on'}, 'theme');
        }else{
            if(retorno.modoDark === 'off'){
                setModoDark('off');
                $html?.classList.add('modo-dark');
            }
        }
    }

    connection();

    async function handleDarkMode() {

        if(modoDark === 'on'){
            setModoDark('off');
            $html?.classList.toggle('modo-dark');
            await indexedDb.putValue('config', {modoDark: 'off'}, 'theme');
        }else if(modoDark === 'off') {
            setModoDark('on');
            $html?.classList.toggle('modo-dark');
            await indexedDb.putValue('config', {modoDark: 'on'}, 'theme');
        }
    }

    return (
        <div className="header">
            <h1>{ titulo }</h1>

            <ul className="navegacao">

                <div className={modoDark === 'on' ? 'mododark dark-on' : 'mododark dark-off'}>
                    <button onClick={handleDarkMode} >
                        <FaSun className='sun'/>
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