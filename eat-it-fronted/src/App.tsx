import React from 'react';
import './App.css';
import { Meals } from './components/Meals';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/meals" component={Meals} />
            </Switch>
        </Router>
    );
}

export default App;
