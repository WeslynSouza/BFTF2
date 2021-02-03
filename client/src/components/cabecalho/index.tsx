import { FaChevronRight } from 'react-icons/fa';

import './style.css';

type CabecalhoProps = {
    titulo: string,
    links: string[]
}

export default ({ titulo, links }: CabecalhoProps) => {
    return (
        <div className="header">
            <h1>{ titulo }</h1>

            <ul className="navegacao">
                <li className="link">{links[0]}</li>
                <div className="link-divisao"><FaChevronRight/></div>
                <li className="link">{links[1]}</li>
            </ul>
        </div>
    )
}