import React, { Component } from 'react';
import {
  Card,
  TextField,
  MenuItem,
  CardHeader,
  Button,
} from '@material-ui/core';
import { addMeal } from '../../actions/mealAction';
import { ProductsList } from '../ProductsList/ProductsList.component';
import { removeProduct, addProduct } from '../../actions/productAction';
import '../../styles/css/add-meal.styles.css';
import { connect } from 'react-redux';
import { ProductsState } from '../../types/Products';

interface AddMealProps {
  addMeal: typeof addMeal;
  removeProduct: typeof removeProduct;
  addProduct: typeof addProduct;
  productsList: ProductType[];
}
interface AddMealState {
  name: string;
  recipe: string;
  selectedProductId: string;
  productsReducer: ProductsState;
}

type ProductType = {
  id: number;
  name: string;
};

const allProducts: ProductType[] = [
  { id: 1, name: 'egg' },
  { id: 2, name: 'water' },
  { id: 3, name: 'salt' },
];
class AddMeal extends Component<AddMealProps, AddMealState> {
  state: AddMealState = {
    name: '',
    recipe: '',
    selectedProductId: '',
    productsReducer: {} as ProductsState,
  };

  add = () => {
    this.props.addMeal({
      id: 3,
      name: this.state.name,
      recipe: this.state.recipe,
    });
    this.setState({ name: '', recipe: '' });
  };

  addProduct = () => {
    const newProduct = allProducts.find(product => {
      return product.id === +this.state.selectedProductId;
    });
    if (newProduct) {
      this.props.addProduct(newProduct);
      this.setState({ selectedProductId: '' });
    }
  };

  render() {
    return (
      <div className="addMealComponent">
        <Card className="padding">
          <CardHeader title="Add new meal" />
          <form>
            <div className="padding">
              <TextField
                label="Title"
                value={this.state.name}
                fullWidth={true}
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <TextField
                label="Recipe"
                value={this.state.recipe}
                multiline={true}
                fullWidth={true}
                onChange={e => {
                  this.setState({ recipe: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <div className="addProductGroup">
                <TextField
                  label="Product"
                  select
                  className="selectProduct"
                  value={this.state.selectedProductId}
                  multiline={true}
                  onChange={e => {
                    this.setState({
                      selectedProductId: e.target.value,
                    });
                  }}
                >
                  {allProducts.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  className="addProduct"
                  variant="contained"
                  color="inherit"
                  size="small"
                  onClick={this.addProduct}
                >
                  Add product
                </Button>
              </div>
              <ProductsList
                productsList={this.props.productsList}
                removeProduct={this.props.removeProduct}
              />
            </div>
            <Button
              className="addButton"
              variant="contained"
              color="inherit"
              size="small"
              onClick={this.add}
            >
              Add
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: AddMealState) => {
  return {
    productsList: state.productsReducer.productsList,
  };
};

export default connect(
  mapStateToProps,
  { addMeal, addProduct, removeProduct },
)(AddMeal);
