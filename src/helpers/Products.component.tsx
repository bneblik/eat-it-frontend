import React, { Component } from 'react';
import '../styles/css/products.styles.css';
import {
  InputAdornment,
  Input,
  FormControl,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  IconButton,
  FormControlLabel,
  Checkbox,
  Fab,
  Tooltip
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import apple from '../styles/images/apple.jpg';
import { Alert } from '@material-ui/lab';
import { ShoppingListProduct, TShoppingList } from '../types/ShoppingList';
import { NutrientsInfo } from '../components/NutrientsInfo/NutrientsInfo.component';
import AddProduct from '../components/AddProduct/AddProduct.component';
import { TFridge, FridgeProduct } from '../types/Fridge';
import { i18n } from '..';

const ShoppingList = 'ShoppingList';
type TProduct = ShoppingListProduct | FridgeProduct;
type TKind = TShoppingList | TFridge;
type ProductsProps = {
  /**
   * it can be one of two types of component
   */
  component: 'MyFridge' | 'ShoppingList';
  /**
   * this message is displayed when @param productsCategories is empty
   */
  emptyMessage: string;
  /**
   * contains list of products ordered by category
   */
  productsCategories: TKind[];
  addToBasket?: (product: TProduct, categoryId: number) => void;
  changeAmount: (product: TProduct, categoryId: number, amount: string) => void;
  removeProduct: (product: TProduct, categoryId: number) => void;
  saveChanges: (changed: TKind[]) => void;
  addProduct: (product: TProduct, categoryId: number, categoryName: string, amount: number) => void;
};
type ProductsState = {
  /**
   * determines whether user has unsaved changes
   * Changes can be saved by clicking the save button at right bottom corner
   */
  unsaved: boolean;
};

/**
 * This component is a helper for displaying list of products ordered by category
 * @see Fridge
 * @see ShoppingList
 * @author Beata Szczuka
 */
class ProductsHelper extends Component<ProductsProps, ProductsState> {
  state: ProductsState = {
    unsaved: false
  };
  renderShoppingList(product: ShoppingListProduct, categoryId: number, key: number) {
    return (
      <FormControl className="productItem" key={key}>
        <FormControlLabel
          control={
            <Checkbox
              checked={product.inBasket}
              onChange={() => this.handleAddToBasket(product, categoryId)}
            />
          }
          label={this.renderProduct(product, categoryId)}
        />
      </FormControl>
    );
  }
  renderProduct(product: TProduct, categoryId: number) {
    return (
      <span className="listItem">
        <img src={apple} alt="product"></img>
        <div className="productName">{product.name}</div>
        <span className="amountInput">
          <Input
            value={product.amount}
            type="number"
            onChange={(e) => this.handleChangeAmount(product, categoryId, e.target.value)}
            endAdornment={<InputAdornment position="end">{product.unit}</InputAdornment>}
          ></Input>
        </span>
        <span className="trashButton">
          <Tooltip title="remove">
            <IconButton onClick={() => this.handleRemoveProduct(product, categoryId)}>
              <FontAwesomeIcon icon={faTrash} size="1x" />
            </IconButton>
          </Tooltip>
        </span>
      </span>
    );
  }

  displayWarning = () => {
    if (this.state.unsaved) {
      return <Alert severity="warning">{i18n._('You have unsaved changes')}</Alert>;
    }
  };
  markAsUnsaved() {
    if (!this.state.unsaved) this.setState({ unsaved: true });
  }

  render() {
    return (
      <div className="shoppingListComponent">
        <Typography className="title" variant="h5">
          <span>
            {this.props.component === ShoppingList
              ? i18n._('Shopping List')
              : i18n._('What do I have in my fridge?')}
          </span>
          <AddProduct buttonName={i18n._('Add product')} addProduct={this.handleAddProduct} />
        </Typography>
        {this.displayWarning()}
        {this.props.productsCategories === [] ? (
          <h3>{this.props.emptyMessage}</h3>
        ) : (
          <div className={`productsContainer ${this.props.component}`}>
            {this.props.productsCategories.map((element, key) => (
              <ExpansionPanel defaultExpanded={true} key={key} className="categoryBlock">
                <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                  <Typography className="title">{element.categoryName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="productsDetails">
                  {this.selectComponent(element.products, element.categoryId)}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        )}
        <Fab className="stickyButton" variant="extended" onClick={this.handleSaveChanges}>
          <FontAwesomeIcon icon={faCheck} />
          {i18n._('Save changes')}
        </Fab>
      </div>
    );
  }

  selectComponent(products: TProduct[], categoryId: number) {
    if (this.props.component === ShoppingList) {
      return this.shoppingListComponent(products, categoryId);
    } else {
      return products.map((product, key) => (
        <div className="productItem" key={key}>
          {this.renderProduct(product, categoryId)}
          <NutrientsInfo
            kcal={product.calories}
            proteins={product.proteins}
            carbs={product.carbs}
            fats={product.fats}
          />
        </div>
      ));
    }
  }

  shoppingListComponent(products: ShoppingListProduct[], categoryId: number) {
    return products.map((product, prodKey) => {
      return this.renderShoppingList(product, categoryId, prodKey);
    });
  }

  handleRemoveProduct = (product, categoryId) => {
    this.props.removeProduct(product, categoryId);
    this.markAsUnsaved();
  };
  handleAddProduct = (product, categoryId, categoryName, value) => {
    this.props.addProduct(product, categoryId, categoryName, value);
    this.markAsUnsaved();
  };
  handleChangeAmount = (product, categoryId, value) => {
    this.props.changeAmount(product, categoryId, value);
    this.markAsUnsaved();
  };
  handleAddToBasket = (product, categoryId) => {
    this.props.addToBasket(product, categoryId);
    this.markAsUnsaved();
  };
  handleSaveChanges = () => {
    this.props.saveChanges(this.props.productsCategories);
    this.setState({ unsaved: false });
  };
}

export default ProductsHelper;
