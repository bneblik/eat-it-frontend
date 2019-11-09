import React, { Component } from 'react';
import { Meals } from '../Meals/Meals.component';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header.component';
import { Meal } from '../Meal/Meal.component';
import { AddMeal } from '../AddMeal/AddMeal.component';
import { addMeal } from '../../actions/action';
import { connect } from "react-redux";
import { reducers } from '../../reducers';
import { MealsState } from '../../types/Meals';


interface AppProps {
    meals: MealsState;
    addMeal: typeof addMeal
  }

type AppState = ReturnType<typeof reducers>;


class App extends Component<AppProps>{
    render(){
    return (
        <>
            <Header></Header>
            <div className="appContent">
                <Router>
                    <Switch>
                        <Route
                            path='/meals'
                            render={(props) => <>
                                <Meals {...props} mealsList={this.props.meals.mealsList}/>
                                <AddMeal {...props} addMeal={this.props.addMeal}/> </>
                        }
                        />
                        <Route 
                            path="/meal/:id"
                            render={(props) => <>
                                <Meal {...props} mealsList={this.props.meals.mealsList}/> </>
                        }/>
                        <Route 
                            path="/add-meal" 
                            render={(props) => <>
                                <AddMeal {...props} addMeal={this.props.addMeal}/> </>
                        }/>
                        <Redirect to="/"></Redirect>
                    </Switch>
                </Router>
            </div>
        </>
    );
    };
}


const mapStateToProps = (state: AppState) => {
  return ({
    meals: state.meals
  });
};
  
export default connect(
  mapStateToProps,
{ addMeal }
)(App);
