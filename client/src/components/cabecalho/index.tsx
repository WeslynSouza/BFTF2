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

                <li className="link">
                    <Link to={links[0].url}>
                        {links[0].titulo}
                    </Link>
                </li>
                <div className="link-divisao"><FaChevronRight/></div>
                <li className="link">
                    <Link to={links[0].url}>
                        {links[1].titulo}
                    </Link>
                </li>
            </ul>
        </div>
    )
}