import React from 'react';
import './App.css';
import { Meals } from './components/Meals/Meals.component';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header } from './components/Header/Header.component';
import { Meal } from './components/Meal/Meal.component';
import { AddMeal } from './components/AddMeal/AddMeal.component';

function App() {
    return (
        <>
            <Header></Header>
            <div className="appContent">
                <Router>
                    <Switch>
                        <Route path="/meals" component={Meals}/>
                        <Route path="/meal/:id" component={Meal}/>
                        <Route path="/add-meal" component={AddMeal}/>
                        <Redirect to="/"></Redirect>
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default App;
