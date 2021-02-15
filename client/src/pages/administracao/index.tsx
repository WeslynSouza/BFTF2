import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { Tabs, Tab } from 'react-bootstrap';

import Usuarios from './tabelas/usuario-tab';
import Times from './tabelas/times-tab';
import Divisoes from './tabelas/divisao-tab';

import './style.css';

export default function Administracao() {

    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo='Administração' links={[{url: '/', titulo: 'Home'}, {url: '/administracao', titulo: 'Administração'}]}/>

            <div className="administracao-container">
                <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                    <Tab className='administracao-tab-item' eventKey='usuario' title='Usuarios'>
                        <Usuarios/>
                    </Tab>
                    <Tab className='administracao-tab-item' eventKey='times' title='Times'>
                        <Times/>
                    </Tab>
                    <Tab className='administracao-tab-item' eventKey='Divisoes' title='Divisões'>
                        <Divisoes/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}