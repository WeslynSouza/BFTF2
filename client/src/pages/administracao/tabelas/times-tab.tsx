import { useState } from 'react';
import InputPesquisa from '../../../components/input-pesquisa';
import { Table, Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';

import img from '../../../assets/perfilPaula.jpg';

export default function Times() {

    const [ pesquisa, setPesquisa ] = useState('');
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

            <Table>
                <thead>
                    <tr>
                        <th>Usuarios</th>
                        <th>Time</th>
                        <th>Divisão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            Nome
                        </td>
                        <td>
                            <button className='butao-alterar'>
                                <FaPen/>
                            </button>
                            <button className='butao-excluir' onClick={handleShow}>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            <img src={img} alt="Avatar"/>
                            Nome jogador
                        </td>
                        <td>
                            Nome
                        </td>
                        <td>
                            <button className='butao-alterar'>
                                <FaPen/>
                            </button>
                            <button className='butao-excluir' onClick={handleShow}>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o time: Nome Time?</Modal.Body>
                <Modal.Footer>
                    <button className="butao-confirmar">Confirmar</button>
                    <button className="butao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}