import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './style.css';

type CabecalhoProps = {
    titulo: string,
    links: {
        url: string,
        titulo: string
    }[]
}

export default function Cabecalho({ titulo, links }: CabecalhoProps) {

    return (
        <div className="header">
            <h1>{ titulo }</h1>

            <ul className="navegacao">
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