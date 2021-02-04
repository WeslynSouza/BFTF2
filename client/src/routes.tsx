import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Noticias from './pages/noticias';
import NoticiaPost from './pages/noticias-post';
import CriarPost from './pages/criar-post';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Noticia' component={Noticias}/>
                <Route path='/NoticiaPost' component={NoticiaPost}/>
                <Route path='/CriarPost' component={CriarPost}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;