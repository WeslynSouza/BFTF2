import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { Tabs, Tab } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import Usuarios from './usuarios';
import Times from './times';
import Divisoes from './divisoes';

import './style.css';

export default function Administracao() {

    return (
        <div className="container">
            <Menu/>
            <Cabecalho titulo='Administração' links={[{url: '/', titulo: 'Home'}, {url: '/administracao', titulo: 'Administração'}]}/>

            <div className="administracao-container">
                <Tabs className='administracao-tab' defaultActiveKey='usuario' id='administracao-tab'>
                    <Tab className='administracao-tab-item' eventKey='usuario' title='Usuarios'>
                        <h1>Usuarios</h1>
                    </Tab>
                    <Tab className='administracao-tab-item' eventKey='times' title='Times'>
                        <h1>Times</h1>
                    </Tab>
                    <Tab className='administracao-tab-item' eventKey='Divisoes' title='Divisões'>
                        <h1>Divisões</h1>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}