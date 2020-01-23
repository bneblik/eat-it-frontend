import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import '../../styles/css/add-product.styles.css';
import { faFilter, faUtensils, faCircle, faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProductType, ProductsState } from '../../types/Products';
import { connect } from 'react-redux';

type AddProductState = {
  name: string;
  amount: string;
  category: string;
  calories: string;
  carbs: string;
  fats: string;
  proteins: string;
  dialogOpened: boolean;
  productsReducer: ProductsState;
};

type AddProductProps = {
  buttonName: string;
  productsList: ProductType[];
  addProduct: (product: ProductType, category: string, amount: string) => void;
};
const defaultState: AddProductState = {
  name: '',
  amount: '',
  category: '',
  calories: '',
  carbs: '',
  fats: '',
  proteins: '',
  dialogOpened: false,
  productsReducer: {} as ProductsState
};

export class AddProduct extends Component<AddProductProps> {
  state: AddProductState = defaultState;

  close() {
    this.setState({
      dialogOpened: false
    });
  }

  save() {
    const product: ProductType = {
      id: 1,
      name: this.state.name,
      category: this.state.category,
      calories: +this.state.calories,
      carbs: +this.state.carbs,
      fats: +this.state.fats,
      proteins: +this.state.proteins
    };
    this.props.addProduct(product, this.state.category, this.state.amount);
    this.close();
  }
  open() {
    this.setState({
      dialogOpened: true
    });
  }

  render() {
    return (
      <>
        <Button
          className="addProduct"
          variant="contained"
          color="inherit"
          size="small"
          onClick={this.open.bind(this)}
          startIcon={<FontAwesomeIcon icon={faEdit} />}
        >
          {this.props.buttonName}
        </Button>
        <Dialog open={this.state.dialogOpened} className="addProductComponent">
          <DialogTitle>{i18n._('Add product')}</DialogTitle>
          <DialogContent>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faUtensils} />
              <Autocomplete
                id="name"
                className="autocomplete"
                options={this.props.productsList}
                getOptionLabel={(o) => o}
                renderOption={(option) => <span>{option.name ? option.name : ''}</span>}
                onChange={(_, product) => {
                  this.setState({
                    name: product ? product.name : '',
                    category: product ? product.category : '',
                    calories: product ? product.calories : '',
                    carbs: product ? product.carbs : '',
                    fats: product ? product.fats : '',
                    proteins: product ? product.proteins : ''
                  });
                }}
                value={this.state.name}
                noOptionsText={i18n._('No products')}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="filled"
                    value={this.state.name}
                    fullWidth
                    label={i18n._('Name')}
                  />
                )}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faBalanceScaleLeft} />
              <TextField
                id="amount"
                label={i18n._('Amount')}
                value={this.state.amount}
                variant="filled"
                onChange={(e) => {
                  this.setState({ amount: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faFilter} />
              <TextField
                id="category"
                label={i18n._('Category')}
                value={this.state.category}
                disabled={true}
                variant="filled"
                className="disabled"
              />
            </div>
            <fieldset>
              <legend>{i18n._('Nutritents info')}</legend>
              <div className="inputContainer">
                <FontAwesomeIcon className="kcal" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Calories')}
                  value={this.state.calories}
                  id="calories"
                  variant="filled"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kcal</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="carbs" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Carbohydrates')}
                  id="carbs"
                  variant="filled"
                  value={this.state.carbs}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="fats" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Fats')}
                  id="fats"
                  value={this.state.fats}
                  variant="filled"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="proteins" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Proteins')}
                  id="proteins"
                  variant="filled"
                  value={this.state.proteins}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>
            </fieldset>
          </DialogContent>
          <DialogActions>
            <Button id="cancel" onClick={this.close.bind(this)} color="primary">
              {i18n._('Cancel')}
            </Button>
            <Button id="save" onClick={this.save.bind(this)} color="primary">
              {i18n._('Save')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state: AddProductState) => {
  return {
    productsList: state.productsReducer.productsList
  };
};

export default connect(mapStateToProps)(AddProduct);
