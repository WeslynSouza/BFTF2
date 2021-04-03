import { useState } from 'react';
import Menu from '../components/menu';
import Cabecalho from '../components/cabecalho';
import Rodape from '../components/rodape';
import { Tabs, Tab } from 'react-bootstrap';

import UsuariosTabela from '../components/tabelas/usuario-tab';
import UsuarioForm from '../components/formularios/usuario-form';
import TimesTabela from '../components/tabelas/times-tab';
import TimeForm from '../components/formularios/time-form';
import DivisoesTabela from '../components/tabelas/divisao-tab';
import PostList from '../components/listas/post-list';
import PostForm from '../components/formularios/post-form';

export default function Administracao() {

    const [ state, setState ] = useState('tabInicial');
    const [ usuarioId, setUsuarioId ] = useState('');
    const [ timeId, setTimeId ]  = useState('');
    const [ postId, setPostId ] = useState('');

    function handleState() {
        switch(state) {
            case "tabInicial":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='usuario' title='Usuarios'>
                            <UsuariosTabela functionUsuarioId={setUsuarioId} functionAlterar={setState}/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='times' title='Times'>
                            <TimesTabela functionTimeId={setTimeId} functionAlterar={setState}/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='Divisoes' title='Divisões'>
                            <DivisoesTabela/>
                        </Tab>
                        <Tab className='administracao-tab-item' eventKey='posts' title='Posts'>
                            <PostList functionPostId={setPostId} functionAlterar={setState}/>
                        </Tab>
                    </Tabs>
                );
            case "usuarioForm":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='usuario' title='Alterar'>
                            <UsuarioForm functionVoltar={setState} usuarioId={usuarioId}/>
                        </Tab>
                    </Tabs>
                );
            case "postForm":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='posts' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='posts' title='Alterar'>
                            <PostForm functionVoltar={setState} postId={postId}/>
                        </Tab>
                    </Tabs>
                );
            case "postForm":
                return (
                    <Tabs className='administracao-tab' defaultActiveKey='time' id='administracao-tab'>
                        <Tab className='administracao-tab-item' eventKey='time' title='Alterar'>
                            <TimeForm functionVoltar={setState} postId={timeId}/>
                        </Tab>
                    </Tabs>
                );
        }
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo='Administração' links={[{url: '/', titulo: 'Home'}, {url: '/administracao', titulo: 'Administração'}]}/>

                <div className="administracao-container">
                    {handleState()}
                </div>
            </div>
            <Rodape/>
        </div>
        
    )
}