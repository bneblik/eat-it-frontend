import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import { Snackbar } from '@material-ui/core';

import { FridgeState, TFridge } from '../../types/Fridge';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from '@material-ui/lab';
import ProductsHelper from '../../helpers/Products.component';
import {
  fetchMyFridge,
  saveFridge,
  changeAmountInFridge,
  removeProductFromFridge,
  addProductToFridge
} from '../../actions/fridgeAction';
import { i18n } from '@lingui/core';

interface ProductsState {
  fridgeReducer: FridgeState;
}
type ProductsProps = {
  productsCategories: TFridge[];
  fetchMyFridge: typeof fetchMyFridge;
  changeAmount: typeof changeAmountInFridge;
  removeProduct: typeof removeProductFromFridge;
  addProduct: typeof addProductToFridge;
  saveFridge: typeof saveFridge;
};

export class Fridge extends Component<ProductsProps> {
  componentDidMount() {
    this.props.fetchMyFridge();
  }

  render() {
    return (
      <ProductsHelper
        emptyMessage={i18n._('Your fridge is empty.')}
        saveChanges={this.props.saveFridge}
        removeProduct={this.props.removeProduct}
        changeAmount={this.props.changeAmount}
        productsCategories={this.props.productsCategories}
        addProduct={this.props.addProduct}
        component="MyFridge"
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

const mapStateToProps = (state: ProductsState) => ({
  productsCategories: state.fridgeReducer.fridge
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMyFridge: fetchMyFridge,
      changeAmount: changeAmountInFridge,
      removeProduct: removeProductFromFridge,
      addProduct: addProductToFridge,
      saveFridge
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fridge);
