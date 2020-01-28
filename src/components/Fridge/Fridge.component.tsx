import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsHelper from '../../helpers/Products.component';
import { fetchMyFridge } from '../../actions/fridge/fetchfridge';
import { i18n } from '@lingui/core';
import {
  changeAmountInFridge,
  removeProductFromFridge,
  addProductToFridge
} from '../../actions/fridge/changeFridge';
import { saveFridge } from '../../actions/fridge/saveFridge';
import { clearFridgeSuccess, clearFridgeError } from '../../actions/fridge/clearMessageFridge';
import { showAlert } from '../../helpers/Alert.component';
import { FridgeProps, FridgeCompState } from './Fridge.types';

/**
 * This component passes the appropriate props to the Products component.
 * The result is a fridge of the logged in user.
 * @see ProductsHelper
 * @author Beata Szczuka
 */
export class Fridge extends Component<FridgeProps, FridgeCompState> {
  componentDidMount() {
    this.props.fetchMyFridge();
  }

  render() {
    const { pending, error, success, clearFridgeError, clearFridgeSuccess } = this.props;
    return (
      <>
        <ProductsHelper
          emptyMessage={i18n._('Your fridge is empty.')}
          saveChanges={this.props.saveFridge}
          removeProduct={this.props.removeProduct}
          changeAmount={this.props.changeAmount}
          productsCategories={this.props.productsCategories}
          addProduct={this.props.addProduct}
          component="MyFridge"
        />
        {showAlert(pending, error, success, clearFridgeError, clearFridgeSuccess)}
      </>
    );
  }
}

const mapStateToProps = (state: FridgeCompState) => ({
  productsCategories: state.fridgeReducer.fridge,
  error: state.fridgeReducer.error,
  success: state.fridgeReducer.success,
  pending: state.fridgeReducer.pending
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMyFridge: fetchMyFridge,
      changeAmount: changeAmountInFridge,
      removeProduct: removeProductFromFridge,
      addProduct: addProductToFridge,
      saveFridge,
      clearFridgeError,
      clearFridgeSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fridge);
