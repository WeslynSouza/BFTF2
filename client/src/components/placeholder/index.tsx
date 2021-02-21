
import Img from '../../assets/barreira.svg';

import './style.scss';

type placeholder = {
    texto: string
}

export default function Placeholder({ texto }: placeholder) {
    return (
        <div className='placeholder'>
            <img src={Img} alt="barreira"/>
            <h2>{texto}</h2>
        </div>
    )
}