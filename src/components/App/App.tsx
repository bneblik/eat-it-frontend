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
import { MyFridge } from '../MyFridge/MyFridge.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { MyMealPlan } from '../MyMealPlan/MyMealPlan.component';
import { UserPanel } from '../UserPanel/UserPanel.component';

library.add(faEnvelope, faKey);

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
              <Route path="/meals/:id" render={(props) => <Meal {...props} />} />
              <Route path="/meals" render={() => <Meals />} />
              <Route path="/add-meal" render={() => <AddMeal />} />
              <Route path="/my-fridge" render={() => <MyFridge />} />
              <Route path="/my-meal-plan" render={() => <MyMealPlan />} />
              <Route path="/user-panel" render={() => <UserPanel username="exampleUser123" />} />
              <Route path="/login" render={(props) => <UserAccount {...props} />} />
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
