import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PopulateDatabase from './orders/pages/PopulateDatabase';

let routes;

const App = () => {
    routes = (
        <Switch>
            <Route path="/" exact>
                <PopulateDatabase />
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