import { useEffect, useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { FaTrash, FaQuestion, FaPen } from 'react-icons/fa';
import InputPesquisa from '../input-pesquisa';
import Placeholder from '../placeholder';
import api from '../../services/api';

import './timesTab.scss';

interface timesTabela {
    functionTimeId: Function,
    functionAlterar: Function
}

type Time = {
    id: number,
    nome: string,
    logo: string,
    lider: {
        nick: string,
        avatar: string,
    },
    divisao: string
}

export default function Times({ functionTimeId, functionAlterar }: timesTabela) {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ atualiarLista, setAtualizarLista ] = useState(false);
    const [ times, setTimes ] = useState<Time[]>([]);
    const [ show, setShow ] = useState(false);
    
    const [ idTimeModal, setIdTimeModal ] = useState(0);
    const [ nomeTimeModal, setNomeTimeModal ] = useState('');

    useEffect(() => {
        api.get(`/times/${pesquisa}`).then(res => {
            setTimes(res.data);
        });
        setAtualizarLista(false);
    }, [pesquisa, atualiarLista])

    const handleClose = () => [setShow(false), setIdTimeModal(0), setNomeTimeModal('')];
    const handleShow = () => setShow(true);

    const handleDeleteTime = async (id: Number) => {

        handleClose();

        if(id == 0) {
            alert("Não foi possível realizar a exclusão do time!");
            return;
        }
        
        await api.delete(`/time/${id}`);

        alert('O time foi excluído com sucesso!');

        setAtualizarLista(true);
    }

    function renderTab() {
        if(times.length !== 0) {
            return (
                <div className="timeTabela">
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Lider</th>
                                <th>Divisão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {times.map(time => {
                                return (
                                    <tr key={time.id}>
                                        <td>
                                            <div className='img-text'>
                                                {time.logo == '' ? 
                                                    <div className='imageless'>
                                                        <FaQuestion/>
                                                    </div> : 
                                                    <img src={time.logo} alt="Avatar"/>
                                                }
                                                {time.nome}
                                            </div>                                    
                                        </td>
                                        <td>
                                            <div className='img-text'>
                                                {time.lider.avatar == '' ? 
                                                    <div className='imageless'>
                                                        <FaQuestion/>
                                                    </div> : 
                                                    <img src={time.lider.avatar} alt="Avatar"/>
                                                }
                                                {time.lider.nick}
                                            </div>   
                                        </td>
                                        <td>
                                            {time.divisao === '' ? 'Sem divisão' : time.divisao}
                                        </td>
                                        <td>
                                            <button className='botao-excluir' onClick={() => [handleShow(), setIdTimeModal(time.id), setNomeTimeModal(time.nome)]}>
                                                <FaTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <Placeholder texto='Nenhum time foi cadastrado no sistema!'/>
            )
        }
    }

    return (
        <div className='administracao-tab-container'>

            <div className="tab-header">
                <h2>Tabela time </h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            {renderTab()}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>Deseja excluir o time: {nomeTimeModal}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => handleDeleteTime(idTimeModal)}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}