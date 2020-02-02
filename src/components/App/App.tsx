import React, { Component } from 'react';
import AllMeals from '../AllMeals/AllMeals.component';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from '../Header/Header.component';
import AddMeal from '../AddMeal/AddMeal.component';
import { connect } from 'react-redux';
import Meal from '../Meal/Meal.component';
import Fridge from '../Fridge/Fridge.component';
import { UserAccount } from '../UserAccount/UserAccount.component';
import ShoppingList from '../ShoppingList/ShoppingList.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import MyMealPlan from '../MyMealPlan/MyMealPlan.component';
import UserPanel from '../UserPanel/UserPanel.component';
import { routes } from './RouteConstants';
import { i18n } from '../..';
import { fetchCategories } from '../../actions/categoriesAction';
import { logOut, clearAuthSuccess, clearAuthError } from '../../actions/authAction';
import { bindActionCreators } from 'redux';
import { successAlert, errorAlert, showAlert } from '../../helpers/Alert.component';
import { JWT_TOKEN } from '../../utils/RequestService';
import { defaultLang } from '../../utils/LanguageService';
import { AppProps } from './App.types';
import { AppState } from '../../store/store';
import { clearAddMealError, clearAddMealSuccess } from '../../actions/mealAction';

library.add(faEnvelope, faKey);
/**
 * This component renders the Header and a component that matches the URL
 * @author Beata Szczuka
 */
class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    const newLang = this.props.match.params.lng;
    if (newLang !== i18n.language) {
      i18n.activate(newLang);
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
    if (localStorage.getItem('wcag')) {
      document.body.classList.add('wcag');
    }
  }

  logout = () => {
    this.props.logOut();
  };

  langUrl() {
    let url = '';
    const lng = this.props.match.params.lng;
    if (!!lng && lng !== defaultLang) url = `/${lng}`;
    return url;
  }

  render() {
    return (
      <>
        <Header history={this.props.history} match={this.props.match} logout={this.logout}></Header>
        <div className="appContent">
          <Route
            render={({ match: { url } }) => {
              return (
                <Switch>
                  <Route path={`${url}${routes.meal}`} render={(props) => <Meal {...props} />} />
                  <Route exact path={`${url}${routes.meals}`} render={(props) => <AllMeals {...props} />} />
                  <Route
                    path={`${url}${routes.addMeal}`}
                    render={(props) => this.requireAuth(<AddMeal {...props} mealToEdit={undefined} />)}
                  />
                  <Route
                    exact
                    path={`${url}${routes.myFridge}`}
                    render={(props) => this.requireAuth(<Fridge {...props} />)}
                  />
                  <Route
                    path={`${url}${routes.myMealPlan}`}
                    render={(props) => this.requireAuth(<MyMealPlan {...props} />)}
                  />
                  <Route
                    path={`${url}${routes.userPanel}`}
                    render={(props) => this.requireAuth(<UserPanel {...props} />)}
                  />
                  <Route path={`${url}${routes.login}`} render={(props) => <UserAccount {...props} />} />
                  <Route
                    path={`${url}${routes.shoppingList}`}
                    render={(props) => this.requireAuth(<ShoppingList {...props} />)}
                  />
                  <Redirect to={`${routes.meals}`} />
                </Switch>
              );
            }}
          />
        </div>
        {this.showAuthAlert()}
        {showAlert(
          this.props.meal.pending,
          this.props.meal.error,
          this.props.meal.success,
          this.props.clearAddMealError,
          this.props.clearAddMealSuccess
        )}
      </>
    );
  }
  requireAuth(component: any) {
    if (localStorage.getItem(JWT_TOKEN)) return component;
    return (
      <Redirect
        to={{
          pathname: `${this.langUrl()}${routes.login}`,
          state: { from: this.props.location }
        }}
      />
    );
  }

  showAuthAlert() {
    if (!this.props.auth.pending && !!this.props.auth.error) {
      return errorAlert({
        isOpen: !!this.props.auth.error,
        message: this.props.auth.error,
        onClose: () => this.props.clearAuthError()
      });
    } else if (!this.props.auth.pending && !!this.props.auth.success) {
      return successAlert({
        isOpen: !!this.props.auth.success,
        message: this.props.auth.success,
        onClose: () => this.props.clearAuthSuccess()
      });
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    meals: state.mealsReducer,
    meal: state.mealReducer,
    auth: state.authReducer,
    categories: state.categoriesReducer
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logOut,
      clearAuthSuccess,
      clearAuthError,
      fetchCategories,
      clearAddMealError,
      clearAddMealSuccess
    },
    dispatch
  );

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(ConnectedApp);
