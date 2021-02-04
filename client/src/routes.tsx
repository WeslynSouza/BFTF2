import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Noticias from './pages/noticias';
import NoticiaPost from './pages/noticias-post';
import CriarPost from './pages/criar-post';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Noticias}/>
                <Route path='/NoticiaPost' component={NoticiaPost}/>
                <Route path='/CriarPost' component={CriarPost}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;