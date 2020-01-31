import React, { Component } from 'react';
import { Card, TextField, CardHeader, Button, InputAdornment } from '@material-ui/core';
import { ProductsList } from '../ProductsList/ProductsList.component';
import '../../styles/css/add-meal.styles.css';
import { connect } from 'react-redux';
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
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Recipe } from '../Recipe/Recipe.component';
import { i18n } from '../..';
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import { addMeal, clearAddMealSuccess, clearAddMealError, editMeal } from '../../actions/mealAction';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../helpers/Alert.component';
import { AddMealProps, AddMealState, initialAddMealState as initialState } from './AddMeal.types';
import Autocomplete from '../Autocomplete/Autocomplete.component';
import { ProductType } from '../../types/Products';
import { Category } from '../../types/Categories';

/**
 * This component renders a new meal adding form.
 * @author Beata Szczuka
 */
export class AddMeal extends Component<AddMealProps, AddMealState> {
  constructor(props) {
    super(props);
    this.state = { ...initialState, videoHelperText: i18n._('Provide url for YouTube recipe') };
  }
  componentDidMount() {
    if (!!this.props.mealToEdit) {
      const { mealToEdit } = this.props;
      this.setState({
        name: mealToEdit.name,
        description: mealToEdit.description ? mealToEdit.description : '',
        prepTime: mealToEdit.prepareTime ? mealToEdit.prepareTime : '',
        recipeSteps: mealToEdit.recipe ? mealToEdit.recipe : [],
        category: mealToEdit.category ? mealToEdit.category : ({} as Category),
        video: mealToEdit.video ? mealToEdit.video : '',
        selectedProductsList: mealToEdit.ingredients ? mealToEdit.ingredients : []
      });
    }
  }
  isButtonAddDisabled = () => {
    const {
      name,
      description,
      recipeSteps,
      prepTime,
      category,
      selectedProductsList,
      videoHelperText
    } = this.state;
    if (
      name === '' ||
      description === '' ||
      recipeSteps.length === 0 ||
      prepTime === '' ||
      Object.keys(category).length === 0 ||
      selectedProductsList.length === 0 ||
      selectedProductsList.find((p) => !p.amount) ||
      videoHelperText !== i18n._('Provide url for YouTube recipe')
    )
      return true;
    return false;
  };
  add = () => {
    let video = this.state.video;
    if (video !== '') {
      const validPrefixLength = 'https://www.youtube.com/watch?v='.length;
      video = video.substring(validPrefixLength);
    }
    const args = {
      name: this.state.name,
      recipes: this.state.recipeSteps.map((step) => ({ instruction: step })),
      description: this.state.description,
      time: this.state.prepTime,
      servings: this.state.servings,
      // eslint-disable-next-line @typescript-eslint/camelcase
      meal_category_id: this.state.category.id,
      image: this.state.selectedFile,
      video: video,
      products: this.state.selectedProductsList.map((p) => ({ id: p.id, amount: p.amount }))
    };
    if (!!this.props.mealToEdit) this.props.editMeal(args, this.props.mealToEdit.id);
    else this.props.addMeal(args);
    this.setState({ ...initialState, videoHelperText: i18n._('Provide url for YouTube recipe') });
  };

  uploadImage() {
    return (
      <>
        <input type="file" id="file" onChange={this.fileChangedHandler} />
        <label htmlFor="file">{i18n._('Add image')}</label>
        {this.state.selectedFile !== null ? (
          <span className="fileName">{this.state.selectedFile.name}</span>
        ) : (
          <></>
        )}
      </>
    );
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  addProduct = () => {
    this.setState((prev: AddMealState) => ({
      selectedProductsList: [...prev.selectedProductsList, prev.selectedProduct],
      selectedProduct: {} as ProductType
    }));
  };

  render() {
    const { pending, error, success, clearAddMealError, clearAddMealSuccess } = this.props;
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
                required
                id="name"
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
                id="description"
                required
                value={this.state.description}
                fullWidth={true}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faCamera} />
              <div>{this.uploadImage()}</div>
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faClock} />
              <TextField
                variant="outlined"
                id="prepTime"
                type="number"
                required
                label={i18n._('Preparation time')}
                value={this.state.prepTime}
                fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="end">min</InputAdornment>
                }}
                onChange={(e) => {
                  this.setState({ prepTime: e.target.value });
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faFilter} />
              <MaterialAutocomplete
                options={this.props.categoriesList}
                className="autocomplete"
                id="category"
                getOptionLabel={(o) => (o.name ? o.name : '')}
                onChange={(_, v) => {
                  this.setState({ category: v });
                }}
                value={this.state.category}
                noOptionsText={i18n._('No categories')}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    required
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
                id="video"
                label={i18n._('YouTube video')}
                helperText={this.state.videoHelperText}
                error={this.state.videoHelperText !== i18n._('Provide url for YouTube recipe')}
                value={this.state.video}
                fullWidth={true}
                onChange={(e) => {
                  this.validateYouTubeVideo(e.target.value);
                }}
              />
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faVideo} />
              <TextField
                label={i18n._('Servings')}
                variant="outlined"
                select
                SelectProps={{ native: true }}
                value={this.state.servings}
                onChange={(e) => {
                  this.setState({ servings: e.target.value });
                }}
              >
                {['0.5', '1', '2'].map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </div>
            <div className="padding">
              <FontAwesomeIcon icon={faClipboardList} />

              <div>
                <div className="addProductGroup">
                  <Autocomplete
                    product={this.state.selectedProduct}
                    handleChangeProduct={(v) => {
                      this.setState({ selectedProduct: v });
                    }}
                  />
                  <span>
                    <Button
                      className="addProduct"
                      variant="contained"
                      disabled={
                        !this.state.selectedProduct ||
                        Object.keys(this.state.selectedProduct).length === 0 ||
                        !!this.state.selectedProductsList.find((e) => e.id === this.state.selectedProduct.id)
                      }
                      onClick={this.addProduct}
                      startIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                      {i18n._('Add')}
                    </Button>
                  </span>
                </div>
                {this.displaySelectedProducts()}
              </div>
            </div>
            <Button
              className="groupButton save"
              disabled={this.isButtonAddDisabled()}
              variant="contained"
              onClick={this.add}
              startIcon={<FontAwesomeIcon icon={faCheck} />}
            >
              {i18n._('Save')}
            </Button>
          </form>
        </Card>
        {showAlert(pending, error, success, clearAddMealError, clearAddMealSuccess)}
      </div>
    );
  }

  displaySelectedProducts() {
    if (this.state.selectedProductsList.length > 0) {
      return (
        <ProductsList
          productsList={this.state.selectedProductsList}
          removeProduct={this.removeFromSelectedProducts}
          changeAmount={this.changeAmountOfSelectedProduct}
        />
      );
    } else {
      return <div className="emptyInfo">{i18n._('You have not added any product yet')}</div>;
    }
  }

  validateYouTubeVideo = (value) => {
    const validPrefix = 'https://www.youtube.com/watch?v=';
    if ((!value.startsWith(validPrefix, 0) || validPrefix.length >= value.length) && value.length > 0) {
      this.setState({ video: value, videoHelperText: i18n._('Given URL is invalid.') });
    } else {
      this.setState({ video: value, videoHelperText: i18n._('Provide url for YouTube recipe') });
    }
  };

  removeFromSelectedProducts = (product: ProductType) => {
    this.setState((prev: AddMealState) => ({
      selectedProductsList: prev.selectedProductsList.filter((p: ProductType) => p !== product)
    }));
  };
  changeAmountOfSelectedProduct = (product: ProductType, amount: string) => {
    this.setState((prev: AddMealState) => ({
      selectedProductsList: prev.selectedProductsList.map((p: ProductType) =>
        p === product ? { ...p, amount: amount } : p
      )
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
    error: state.mealReducer.error,
    success: state.mealReducer.success,
    pending: state.mealReducer.pending,
    categoriesList: state.categoriesReducer.categoriesList
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addMeal: addMeal,
      clearAddMealError,
      clearAddMealSuccess,
      editMeal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMeal);
