import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import { TShoppingList, ShoppingListState } from '../../types/ShoppingList';
import { fetchMyShoppingList } from '../../actions/shoppingList/fetchShoppingList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsHelper from '../../helpers/Products.component';
import { i18n } from '../..';
import {
  addToBasket,
  changeAmountInList,
  removeProductFromList,
  addProductToList
} from '../../actions/shoppingList/changeShoppingList';
import { saveShoppingList } from '../../actions/shoppingList/saveShoppingList';
import { showAlert } from '../../helpers/Alert.component';
import {
  clearShoppingListSuccess,
  clearShoppingListError
} from '../../actions/shoppingList/clearMessageShoppingList';

interface ShoppingListCompState {
  shoppingListReducer: ShoppingListState;
}
type ShoppingListProps = {
  /**
   * contains the shopping list of a logged in user
   */
  productsCategories: TShoppingList[];
  error: any;
  success: any;
  pending: boolean;
  fetchMyShoppingList: typeof fetchMyShoppingList;
  addToBasket: typeof addToBasket;
  changeAmount: typeof changeAmountInList;
  removeProduct: typeof removeProductFromList;
  saveShoppingList: typeof saveShoppingList;
  addProduct: typeof addProductToList;
  clearShoppingListSuccess: typeof clearShoppingListSuccess;
  clearShoppingListError: typeof clearShoppingListError;
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
    const { pending, error, success, clearShoppingListError, clearShoppingListSuccess } = this.props;
    return (
      <>
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
        {showAlert(pending, error, success, clearShoppingListError, clearShoppingListSuccess)}
      </>
    );
  }
}

const mapStateToProps = (state: ShoppingListCompState) => ({
  productsCategories: state.shoppingListReducer.shoppingList,
  error: state.shoppingListReducer.error,
  success: state.shoppingListReducer.success,
  pending: state.shoppingListReducer.pending
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMyShoppingList: fetchMyShoppingList,
      addToBasket: addToBasket,
      changeAmount: changeAmountInList,
      removeProduct: removeProductFromList,
      saveShoppingList: saveShoppingList,
      addProduct: addProductToList,
      clearShoppingListError,
      clearShoppingListSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
