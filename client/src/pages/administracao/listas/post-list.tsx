import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import InputPesquisa from '../../../components/input-pesquisa';

type postTabela = {
    functionAlterar: Function;
}

export default function PostTabela({ functionAlterar }: postTabela) {

    const [ pesquisa, setPesquisa ] = useState('tabela');
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='administracao-tab-container'>

            <div className="tab-header">
                <h2>Tabela time </h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            <ul>
                <li>
                    <h4>Titulo do post</h4>

                    <div className='lista-botoes'>
                        <button className='botao-alterar'>
                            <FaPen onClick={() => functionAlterar('formulario')}/>
                        </button>
                        <button className='botao-excluir' onClick={() => handleShow()}>
                            <FaTrash/>
                        </button>
                    </div>
                </li>

                <li>
                    <h4>Titulo do post</h4>

                    <div className='lista-botoes'>
                        <button className='botao-alterar'>
                            <FaPen onClick={() => functionAlterar('formulario')}/>
                        </button>
                        <button className='botao-excluir' onClick={() => handleShow()}>
                            <FaTrash/>
                        </button>
                    </div>
                </li>
            </ul>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o post: Titulo do post?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar">Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}