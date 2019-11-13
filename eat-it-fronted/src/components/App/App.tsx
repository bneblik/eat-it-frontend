import React, { Component } from 'react';
import { Meals } from '../Meals/Meals.component';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header.component';
import { AddMeal } from '../AddMeal/AddMeal.component';
import { addMeal } from '../../actions/mealAction';
import { connect } from "react-redux";
import { reducers } from '../../reducers';
import { MealsState } from '../../types/Meals';
import { Meal } from '../Meal/Meal.component';
import { removeProduct, addProduct } from '../../actions/productAction';
import { ProductsState } from '../../types/Products';
import { UserAccount } from '../UserAccount/UserAccount.component';

interface AppProps {
    meals: MealsState;
    addMeal: typeof addMeal;
    products: ProductsState;
    addProduct: typeof addProduct;
    removeProduct: typeof removeProduct;
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
                                <AddMeal 
                                    {...props} 
                                    addMeal={this.props.addMeal}
                                    productsList={this.props.products.productsList}
                                    removeProduct={this.props.removeProduct}
                                    addProduct={this.props.addProduct}
                                /> </>
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
                                <AddMeal 
                                    {...props} 
                                    addMeal={this.props.addMeal}
                                    productsList={this.props.products.productsList}
                                    addProduct={this.props.addProduct}
                                    removeProduct={this.props.removeProduct}
                                /> </>
                        }/>
                        <Route 
                            path="/login"
                            render={(props) => <>
                                <UserAccount {...props} /></>
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
    meals: state.meals,
    products: state.products
  });
};
  
export default connect(
  mapStateToProps,
{ addMeal, addProduct, removeProduct }
)(App);
