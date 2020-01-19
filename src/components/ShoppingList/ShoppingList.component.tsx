import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import { Snackbar } from '@material-ui/core';
import { TShoppingList, ShoppingListState } from '../../types/ShoppingList';
import {
  fetchMyShoppingList,
  addToBasket,
  changeAmountInList,
  removeProductFromList,
  saveShoppingList
} from '../../actions/shoppingListAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from '@material-ui/lab';
import ProductsHelper from '../../helpers/Products.component';

interface ShoppingListCompState {
  shoppingListReducer: ShoppingListState;
}
type ShoppingListProps = {
  productsCategories: TShoppingList[];
  fetchMyShoppingList: typeof fetchMyShoppingList;
  addToBasket: typeof addToBasket;
  changeAmount: typeof changeAmountInList;
  removeProduct: typeof removeProductFromList;
  saveShoppingList: typeof saveShoppingList;
};

class ShoppingList extends Component<ShoppingListProps> {
  componentDidMount() {
    this.props.fetchMyShoppingList();
  }

  render() {
    return (
      <ProductsHelper
        saveChanges={this.props.saveShoppingList}
        removeProduct={this.props.removeProduct}
        changeAmount={this.props.changeAmount}
        addToBasket={this.props.addToBasket}
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
      saveShoppingList: saveShoppingList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);