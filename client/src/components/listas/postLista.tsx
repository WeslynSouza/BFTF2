import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import InputPesquisa from '../input-pesquisa';
import Placeholder from '../placeholder';
import api from '../../services/api';

import './postLista.scss';

type postTabela = {
    functionPostId: Function,
    functionAlterar: Function;
}

type Post = {
    id: number,
    titulo: string
}

export default function PostTabela({ functionAlterar, functionPostId }: postTabela) {

    const [ pesquisa, setPesquisa ] = useState('');
    const [ atualizarList, setAtualizarLista ] = useState(false);
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ show, setShow ] = useState(false);

    const [ idPostModal, setIdPostModal ] = useState(0);
    const [ tituloPostModal, setTituloPostModal ] = useState('');

    useEffect(() => {
        api.get(`/posts/${pesquisa}`).then(res => {
            setPosts(res.data);
        });

        setAtualizarLista(false);
    }, [pesquisa, atualizarList])

    const handleClose = () => [setShow(false), setIdPostModal(0), setTituloPostModal('')];
    const handleShow = () => setShow(true);

    const handlePostDelete = async (id: Number) => {

        handleClose();

        if(id === 0){
            alert("Não foi possível realizar a exclusão!");
            return;
        }

        await api.delete(`/post/${id}`);

        alert("O post foi excluído com sucesso!");

        setAtualizarLista(true);
    }

    function renderTab() {
        if(posts.length !== 0) {
            return (
                <div className='postLista'>
                    <ul>
                        {posts.map(post => {
                            return (
                                <li key={post.id}>
                                    <h4>{post.titulo}</h4>

                                    <div className='lista-botoes'>
                                        <button className='botao-alterar' onClick={() => [functionAlterar('postForm'), functionPostId(post.id)]}>
                                            <FaPen/>
                                        </button>
                                        <button className='botao-excluir' onClick={() => [handleShow(), setIdPostModal(post.id), setTituloPostModal(post.titulo)]}>
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }else {
            return (
                <Placeholder texto='Nenhum post foi cadastrado no sistema!'/>
            )
        }
    }

    return (
        <div className='administracao-tab-container'>

            <div className="tab-header">
                <h2>Lista posts</h2>

                <InputPesquisa value={pesquisa}
                    setValue={setPesquisa} height='4rem' inputWidth='23.53rem' 
                    buttonWidth='5.7rem' fontInput='2.1rem' fontButton='2.6rem'/>
            </div>

            {renderTab()}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o post: {tituloPostModal}?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar" onClick={() => handlePostDelete(idPostModal)}>Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}