import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import InputPesquisa from '../input-pesquisa';
import Placeholder from '../placeholder';
import api from '../../services/api';

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
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        api.get(`/posts/${pesquisa}`).then(res => {
            setPosts(res.data);
        })
    }, [pesquisa])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderTab() {
        if(posts.length !== 0) {
            return (
                <ul>
                    {posts.map(post => {
                        return (
                            <li key={post.id}>
                                <h4>{post.titulo}</h4>

                                <div className='lista-botoes'>
                                    <button className='botao-alterar' onClick={() => [functionAlterar('postForm'), functionPostId(post.id)]}>
                                        <FaPen/>
                                    </button>
                                    <button className='botao-excluir' onClick={() => handleShow()}>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
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
                <Modal.Body>Deseja excluir o post: Titulo do post?</Modal.Body>
                <Modal.Footer>
                    <button className="botao-confirmar">Confirmar</button>
                    <button className="botao-voltar" onClick={handleClose}>Voltar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}