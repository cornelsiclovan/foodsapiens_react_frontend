import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Orders from './orders/pages/Orders';

let routes;

const App = () => {
    routes = (
        <Switch>
            <Route path="/" exact>
                <Orders />
            </Route>
        </Switch>
    );

    return (
        <Router>
            <main>
                {routes}
            </main>
        </Router>
    );
};

export default App;