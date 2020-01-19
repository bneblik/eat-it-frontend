import React, { Component } from 'react';
import { Card, TextField, CardHeader, Button } from '@material-ui/core';
import { ProductsList } from '../ProductsList/ProductsList.component';
import '../../styles/css/add-meal.styles.css';
import { connect } from 'react-redux';
import { ProductsState, ProductType } from '../../types/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUtensils,
  faInfo,
  faClipboardList,
  faFilter,
  faListOl,
  faCheck,
  faCamera,
  faTimes,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Recipe } from '../Recipe/Recipe.component';
import { i18n } from '../..';
import { Autocomplete } from '@material-ui/lab';
import { addMeal } from '../../actions/mealAction';
import { MealStateType, TMeal } from '../../types/MealTypes';
import { bindActionCreators } from 'redux';

interface AddMealProps {
  productsList: ProductType[];
  addMeal: typeof addMeal;
  error: any | null;
  meal: TMeal | undefined;
  pending: boolean;
}
interface AddMealState {
  name: string;
  recipeSteps: string[];
  description: string;
  prepTime: string;
  category: string;
  video: string;
  selectedProduct: ProductType;
  productsReducer: ProductsState;
  selectedProductsList: ProductType[];
  mealReducer: MealStateType;
}

const initialState: AddMealState = {
  name: '',
  recipeSteps: [],
  description: '',
  prepTime: '',
  category: '',
  video: '',
  selectedProduct: {} as ProductType,
  selectedProductsList: [],
  productsReducer: {} as ProductsState,
  mealReducer: {} as MealStateType
};

class AddMeal extends Component<AddMealProps, AddMealState> {
  state: AddMealState = initialState;
  add = () => {
    this.props.addMeal({
      id: 1,
      name: this.state.name,
      recipe: this.state.recipeSteps,
      description: this.state.description,
      prepareTime: this.state.prepTime,
      category: this.state.category,
      video: this.state.video,
      ingredients: this.state.selectedProductsList
    });
    this.setState(initialState);
  };

  addProduct = () => {
    this.setState((prev: AddMealState) => ({
      selectedProductsList: [...prev.selectedProductsList, prev.selectedProduct]
    }));
    this.setState({ selectedProduct: {} as ProductType });
  };

  render() {
    return (
      <div className="addMealComponent">
        <Card>
          <CardHeader className="title" title={i18n._('Add a new meal')} />
          <form>
            <div className="padding">
              <FontAwesomeIcon icon={faUtensils} />
              <TextField
                variant="outlined"
                label={i18n._('Name')}
                autoFocus={true}
                value={this.state.name}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faInfo} />
              <TextField
                variant="outlined"
                label={i18n._('Description')}
                value={this.state.description}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faCamera} />
              <div>
                <Button variant="contained" className="uploadImage">
                  {i18n._('Add image')}
                </Button>
              </div>
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faClock} />
              <TextField
                variant="outlined"
                label={i18n._('Preparation time')}
                value={this.state.prepTime}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ prepTime: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faFilter} />
              <Autocomplete
                options={['dinner', 'breakfast']}
                className="autocomplete"
                getOptionLabel={(o) => o}
                onChange={(e, v) => {
                  this.setState({ category: v });
                }}
                value={this.state.category}
                noOptionsText={i18n._('No categories')}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    value={this.state.category}
                    fullWidth
                    label={i18n._('Category')}
                  />
                )}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faListOl} />
              <Recipe
                steps={this.state.recipeSteps}
                removeStep={this.removeRecipeStep}
                addStep={this.addRecipeStep}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faVideo} />
              <TextField
                variant="outlined"
                label={i18n._('YouTube video')}
                helperText={i18n._('Provide url for YouTube recipe')}
                value={this.state.video}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ video: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faClipboardList} />
              <div>
                <div className="addProductGroup">
                  <Autocomplete
                    options={this.props.productsList}
                    className="autocomplete"
                    getOptionLabel={(o) => (o.name ? o.name : '')}
                    onChange={(e, v) => {
                      this.setState({ selectedProduct: v });
                    }}
                    value={this.state.selectedProduct}
                    noOptionsText={i18n._('No products')}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        value={this.state.selectedProduct}
                        fullWidth
                        label={i18n._('Ingredient')}
                      />
                    )}
                  />
                  <span>
                    <Button
                      className="addProduct"
                      variant="contained"
                      onClick={this.addProduct}
                      startIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                      {i18n._('Add')}
                    </Button>
                  </span>
                </div>
                <ProductsList
                  productsList={this.state.selectedProductsList}
                  removeProduct={this.removeFromSelectedProducts}
                />
              </div>
            </div>
            <Button
              className="groupButton save"
              variant="contained"
              onClick={this.add}
              startIcon={<FontAwesomeIcon icon={faCheck} />}
            >
              {i18n._('Save')}
            </Button>
            <Button
              className="groupButton cancel"
              variant="contained"
              onClick={this.add}
              startIcon={<FontAwesomeIcon icon={faTimes} />}
            >
              {i18n._('Cancel')}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  removeFromSelectedProducts = (product: ProductType) => {
    this.setState((prev: AddMealState) => ({
      selectedProductsList: prev.selectedProductsList.filter((p: ProductType) => p !== product)
    }));
  };
  removeRecipeStep = (step: string) => {
    this.setState((prev: AddMealState) => ({
      recipeSteps: prev.recipeSteps.filter((s: string) => s !== step)
    }));
  };
  addRecipeStep = (step: string) => {
    this.setState((prev: AddMealState) => ({
      recipeSteps: [...prev.recipeSteps, step]
    }));
  };
}

const mapStateToProps = (state: AddMealState) => {
  return {
    productsList: state.productsReducer.productsList,
    error: state.mealReducer.error,
    meal: state.mealReducer.meal,
    pending: state.mealReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addMeal: addMeal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMeal);
