import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import { Snackbar } from '@material-ui/core';
import { TShoppingList, ShoppingListState } from '../../types/ShoppingList';
import {
  fetchMyShoppingList,
  addToBasket,
  changeAmountInList,
  removeProductFromList,
  saveShoppingList,
  addProductToList
} from '../../actions/shoppingListAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from '@material-ui/lab';
import ProductsHelper from '../../helpers/Products.component';
import { i18n } from '../..';

interface ShoppingListCompState {
  shoppingListReducer: ShoppingListState;
}
type ShoppingListProps = {
  /**
   * contains the shopping list of a logged in user
   */
  productsCategories: TShoppingList[];
  fetchMyShoppingList: typeof fetchMyShoppingList;
  addToBasket: typeof addToBasket;
  changeAmount: typeof changeAmountInList;
  removeProduct: typeof removeProductFromList;
  saveShoppingList: typeof saveShoppingList;
  addProduct: typeof addProductToList;
};

/**
 * This component passes the appropriate props to the Products component.
 * The result is a shopping list of the logged in user.
 * @see ProductsHelper
 * @author Beata Szczuka
 */
export class ShoppingList extends Component<ShoppingListProps> {
  componentDidMount() {
    this.props.fetchMyShoppingList();
  }

  render() {
    return (
      <ProductsHelper
        emptyMessage={i18n._('Your shopping list is empty')}
        saveChanges={this.props.saveShoppingList}
        removeProduct={this.props.removeProduct}
        changeAmount={this.props.changeAmount}
        addToBasket={this.props.addToBasket}
        addProduct={this.props.addProduct}
        productsCategories={this.props.productsCategories}
        component="ShoppingList"
      />
    );
  }

  showAlert = () => {
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
        <Alert onClose={() => {}} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    );
  };
}

const mapStateToProps = (state: ShoppingListCompState) => ({
  productsCategories: state.shoppingListReducer.shoppingList
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMyShoppingList: fetchMyShoppingList,
      addToBasket: addToBasket,
      changeAmount: changeAmountInList,
      removeProduct: removeProductFromList,
      saveShoppingList: saveShoppingList,
      addProduct: addProductToList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
