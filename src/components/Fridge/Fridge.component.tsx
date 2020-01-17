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
  removeProductFromFridge
} from '../../actions/fridgeAction';

interface ProductsState {
  fridgeReducer: FridgeState;
}
type ProductsProps = {
  productsCategories: TFridge[];
  fetchMyFridge: typeof fetchMyFridge;
  changeAmount: typeof changeAmountInFridge;
  removeProduct: typeof removeProductFromFridge;
  saveFridge: typeof saveFridge;
};

class Fridge extends Component<ProductsProps> {
  componentDidMount() {
    this.props.fetchMyFridge();
  }

  render() {
    return (
      <ProductsHelper
        saveChanges={this.props.saveFridge}
        removeProduct={this.props.removeProduct}
        changeAmount={this.props.changeAmount}
        productsCategories={this.props.productsCategories}
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
      saveFridge: saveFridge
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fridge);
