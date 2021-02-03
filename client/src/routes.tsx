import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Forum from './pages/forum';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Forum}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;