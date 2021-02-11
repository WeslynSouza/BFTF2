import { FaSearch } from 'react-icons/fa';

import './style.css';

type InputPesquisa = {
    value: string,
    setValue: Function,
    height: string,
    inputWidth: string,
    buttonWidth: string,
    fontInput: string,
    fontButton: string
}

export default function InputPesquisa({value, setValue, height, inputWidth, buttonWidth, fontInput, fontButton}: InputPesquisa) {
    return (
        <div className="input-grupo">
            <input 
                onChange={event  => setValue(event.target.value)} 
                type="text" value={value} 
                placeholder="Pesquisar..."
                style={{width: inputWidth, height, fontSize: fontInput}}/>
            <button style={{width: buttonWidth, height, fontSize: fontButton}}>
                <FaSearch/>
            </button>
        </div>
    )
}