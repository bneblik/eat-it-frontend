import React, { Component } from 'react';
import AllMeals from '../AllMeals/AllMeals.component';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from '../Header/Header.component';
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
import { ShoppingList } from '../ShoppingList/ShoppingList.component';
import { i18n } from '../..';
import { routes } from './RouteConstants';

library.add(faEnvelope, faKey);

interface AppProps {
  meals: MealsState;
  products: ProductsState;
  history: any;
  location: any;
  match: any;
}

type AppState = ReturnType<typeof reducers>;

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    const newLang = this.props.match.params.lng;
    if (newLang !== i18n.language) {
      i18n.activate(newLang);
    }
  }
  render() {
    return (
      <>
        <Header history={this.props.history} match={this.props.match}></Header>
        <div className="appContent">
          <Route
            render={({ match: { url } }) => (
              <Switch>
                <Route path={`${url}${routes.meal}`} render={(props) => <Meal {...props} />} />
                <Route exact path={`${url}${routes.meals}`} render={(props) => <AllMeals {...props} />} />
                <Route path={`${url}${routes.addMeal}`} render={(props) => <AddMeal {...props} />} />
                <Route exact path={`${url}${routes.myFridge}`} render={(props) => <MyFridge {...props} />} />
                <Route path={`${url}${routes.myMealPlan}`} render={(props) => <MyMealPlan {...props} />} />
                <Route
                  path={`${url}${routes.userPanel}`}
                  render={(props) => <UserPanel {...props} username="exampleUser123" />}
                />
                <Route path={`${url}${routes.login}`} render={(props) => <UserAccount {...props} />} />
                <Route
                  path={`${url}${routes.shoppingList}`}
                  render={(props) => <ShoppingList {...props} />}
                />
                <Redirect to={`${url}${routes.meal}`} />
              </Switch>
            )}
          />
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

export default withRouter(connect(mapStateToProps)(App));
