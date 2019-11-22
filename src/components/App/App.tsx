import React, { Component } from 'react';
import Meals from '../Meals/Meals.component';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header.component';
import AddMeal from '../AddMeal/AddMeal.component';
import { connect } from 'react-redux';
import { reducers } from '../../reducers';
import { MealsState } from '../../types/Meals';
import { Meal } from '../Meal/Meal.component';
import { ProductsState } from '../../types/Products';
import { UserAccount } from '../UserAccount/UserAccount.component';

interface AppProps {
  meals: MealsState;
  products: ProductsState;
}

type AppState = ReturnType<typeof reducers>;

class App extends Component<AppProps> {
  render() {
    return (
      <>
        <Header></Header>
        <div className="appContent">
          <Router>
            <Switch>
              <Route
                path="/meals/:id"
                render={(props) => (
                  <>
                    <Meal {...props} />{' '}
                  </>
                )}
              />
              <Route
                path="/meals"
                render={() => (
                  <>
                    <Meals />
                    <AddMeal />
                  </>
                )}
              />
              <Route path="/add-meal" render={() => <AddMeal />} />
              <Route
                path="/login"
                render={(props) => (
                  <>
                    <UserAccount {...props} />
                  </>
                )}
              />
              <Redirect to="/"></Redirect>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    meals: state.mealReducer,
    products: state.productsReducer
  };
};

export default connect(mapStateToProps)(App);
